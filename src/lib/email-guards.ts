// Input and abuse guards shared by the email API routes.

export const EMAIL_MAX = 254;
export const LOCAL_PART_MAX = 64;
export const EMAIL_PATTERN = /^[^\s@<>()",;:\\]+@[^\s@<>()",;:\\]+\.[^\s@<>()",;:\\]+$/;

export function isValidEmail(email: string): boolean {
  return (
    email.length <= EMAIL_MAX &&
    email.indexOf("@") <= LOCAL_PART_MAX &&
    EMAIL_PATTERN.test(email)
  );
}

// Collapses CR/LF so a value can't add lines to a mail header.
export function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}

export const RATE_LIMIT = 5;
export const RATE_WINDOW_MS = 10 * 60 * 1000;

// Per-instance limit; resets on cold start. Durable limiting is a follow-up.
// Each route creates its own limiter, so limits are counted per route.
export function createRateLimiter() {
  const sendsByIp = new Map<string, number[]>();

  function recentSends(ip: string, now: number): number[] {
    if (sendsByIp.size > 1000) {
      for (const [key, times] of sendsByIp) {
        if (times.every((t) => now - t >= RATE_WINDOW_MS)) sendsByIp.delete(key);
      }
    }
    return (sendsByIp.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  }

  return {
    isLimited(ip: string, now: number): boolean {
      return recentSends(ip, now).length >= RATE_LIMIT;
    },
    record(ip: string, now: number): void {
      sendsByIp.set(ip, [...recentSends(ip, now), now]);
    },
  };
}
