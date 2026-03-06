import { create } from "zustand";
import type { AuthUser } from "@/features/auth/types/auth.type";

export type AuthStatus =
  | "idle"
  | "loading"
  | "authenticated"
  | "anonymous"
  | "refreshing";

type AuthState = {
  accessToken: string | null;
  user: AuthUser | null;
  status: AuthStatus;
  isBootstrapped: boolean;

  setAccessToken: (token: string | null) => void;
  setUser: (user: AuthUser | null) => void;
  setStatus: (status: AuthStatus) => void;
  setBootstrapped: (value: boolean) => void;

  setSession: (payload: { accessToken: string; user: AuthUser }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  status: "idle",
  isBootstrapped: false,

  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  setBootstrapped: (value) => set({ isBootstrapped: value }),

  setSession: ({ accessToken, user }) =>
    set({
      accessToken,
      user,
      status: "authenticated",
      isBootstrapped: true,
    }),

  clearSession: () =>
    set({
      accessToken: null,
      user: null,
      status: "anonymous",
      isBootstrapped: true,
    }),
}));