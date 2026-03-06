import { useAuthStore } from "@/app/store/auth.store";
import { getMe } from "@/features/auth/api/me";
import { login } from "@/features/auth/api/login";
import { logout } from "@/features/auth/api/logout";
import { refreshToken } from "@/features/auth/api/refresh";
import type { LoginPayload } from "../types/auth.type";
import {
  getStoredAccessToken,
  removeStoredAccessToken,
  setStoredAccessToken,
} from "@/shared/lib/auth-token";

export const sessionService = {
  async bootstrap() {
    const authStore = useAuthStore.getState();
    const storedToken = getStoredAccessToken();

    if (!storedToken) {
      authStore.clearSession();
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

  async login(payload: LoginPayload) {
    const authStore = useAuthStore.getState();

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