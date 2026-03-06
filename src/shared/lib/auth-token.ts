const ACCESS_TOKEN_KEY = "app_access_token";

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setStoredAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function removeStoredAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}