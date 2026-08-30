/**
 * Typed access to public (VITE_*) environment variables.
 * Never put secrets here — this file is bundled into the client.
 */
export const env = {
  appName: import.meta.env.VITE_APP_NAME ?? "MyWora",
  appUrl: import.meta.env.VITE_APP_URL ?? "http://localhost:5173",
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
} as const;
