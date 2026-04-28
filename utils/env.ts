export function getRequiredEnv(name: string, fallback?: string): string {
  const value = process.env[name]?.trim() || fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getRequiredUrlEnv(name: string, fallback?: string): string {
  const value = getRequiredEnv(name, fallback);

  try {
    return new URL(value).toString().replace(/\/$/, '');
  } catch {
    throw new Error(`Invalid URL in ${name}: "${value}". Example: https://example.com`);
  }
}
