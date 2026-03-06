function getEnv(name: keyof ImportMetaEnv) {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export const env = {
  apiBaseUrl: getEnv("VITE_API_BASE_URL"),
};