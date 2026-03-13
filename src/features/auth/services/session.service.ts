import { useAuthStore } from "@/app/store/auth.store";
import { getMe } from "@/features/auth/api/me";
import { login } from "@/features/auth/api/login";
import { logout } from "@/features/auth/api/logout";
import { refreshToken } from "@/features/auth/api/refresh";
import type { AuthUser, LoginPayload } from "../types/auth.type";
import {
  getStoredAccessToken,
  removeStoredAccessToken,
  setStoredAccessToken,
} from "@/shared/lib/auth-token";

const isMockAuthEnabled = import.meta.env.VITE_MOCK_AUTH === "true";

const MOCK_USER: AuthUser = {
  id: "u1",
  name: "Admin Perpustakaan",
  email: "admin@library.id",
  roles: ["ADMIN"],
  permissions: [
    "dashboard.view",
    "bibliographic.read",
    "membership.read",
    "membership.create",
    "circulation.read",
    "reporting.read",
    "masterfile.read",
    "stocktake.read",
  ],
};

export const sessionService = {
  async bootstrap() {
    const authStore = useAuthStore.getState();
    const storedToken = getStoredAccessToken();

    if (!storedToken) {
      authStore.clearSession();
      return;
    }

    if (isMockAuthEnabled) {
      authStore.setSession({
        accessToken: storedToken,
        user: MOCK_USER,
      });
      return;
    }

    try {
      authStore.setStatus("loading");
      authStore.setAccessToken(storedToken);

      const user = await getMe();

      authStore.setSession({
        accessToken: storedToken,
        user,
      });
    } catch {
      try {
        authStore.setStatus("refreshing");

        const refreshed = await refreshToken();
        setStoredAccessToken(refreshed.accessToken);
        authStore.setAccessToken(refreshed.accessToken);

        const user = await getMe();

        authStore.setSession({
          accessToken: refreshed.accessToken,
          user,
        });
      } catch {
        removeStoredAccessToken();
        authStore.clearSession();
      }
    } finally {
      authStore.setBootstrapped(true);
    }
  },

  // async login(payload: LoginPayload) {
  //   const authStore = useAuthStore.getState();

  //   const result = await login(payload);
  //   setStoredAccessToken(result.accessToken);
  //   authStore.setAccessToken(result.accessToken);

  //   const user = await getMe();

  //   authStore.setSession({
  //     accessToken: result.accessToken,
  //     user,
  //   });

  //   return { accessToken: result.accessToken, user };
  // },

  async login(payload: LoginPayload) {
    const authStore = useAuthStore.getState();

    if (isMockAuthEnabled) {
      // simulasi delay network
      await new Promise((r) => setTimeout(r, 700));

      // validasi dummy sederhana
      if (
        payload.username !== "admin@library.id" ||
        payload.password !== "admin123"
      ) {
        throw new Error("Email atau password salah");
      }

      const fakeToken = "mock_access_token_123";

      setStoredAccessToken(fakeToken);
      authStore.setSession({
        accessToken: fakeToken,
        user: MOCK_USER,
      });

      return {
        accessToken: fakeToken,
        user: MOCK_USER,
      };
    }

    const result = await login(payload);
    setStoredAccessToken(result.accessToken);
    authStore.setAccessToken(result.accessToken);

    const user = await getMe();

    authStore.setSession({
      accessToken: result.accessToken,
      user,
    });

    return { accessToken: result.accessToken, user };
  },

  async refresh() {
    const authStore = useAuthStore.getState();

    const refreshed = await refreshToken();
    setStoredAccessToken(refreshed.accessToken);
    authStore.setAccessToken(refreshed.accessToken);

    return refreshed.accessToken;
  },

  async logout() {
    try {
      await logout();
    } finally {
      removeStoredAccessToken();
      useAuthStore.getState().clearSession();
    }
  },

  clearLocalSession() {
    removeStoredAccessToken();
    useAuthStore.getState().clearSession();
  },
};
