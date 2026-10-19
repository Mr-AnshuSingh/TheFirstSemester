/**
 * In-memory sliding-window rate limiter for API endpoints
 */

interface RateLimitRecord {
  timestamps: number[];
}

const rateLimitStore = new Map<string, RateLimitRecord>();

// Clean up old entries periodically to prevent memory leaks (every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    const keysToDelete: string[] = [];
    rateLimitStore.forEach((record: RateLimitRecord, key: string) => {
      record.timestamps = record.timestamps.filter((t: number) => now - t < 300000);
      if (record.timestamps.length === 0) {
        keysToDelete.push(key);
      }
    });
    for (let i = 0; i < keysToDelete.length; i++) {
      rateLimitStore.delete(keysToDelete[i]);
    }
  }, 300000);
}

export interface RateLimitOptions {
  windowMs?: number; // Default: 60,000 ms (1 minute)
  maxRequests?: number; // Default: 15 requests per window
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetSeconds: number;
}

/**
 * Checks whether the given client identifier (IP address) has exceeded the rate limit.
 */
export function checkRateLimit(
  clientIp: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs ?? 60000;
  const maxRequests = options.maxRequests ?? 15;
  const now = Date.now();

  const record = rateLimitStore.get(clientIp) ?? { timestamps: [] };

  // Filter out timestamps outside the active window
  record.timestamps = record.timestamps.filter((t: number) => now - t < windowMs);

  if (record.timestamps.length >= maxRequests) {
    const oldest = record.timestamps[0] || now;
    const resetSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      resetSeconds: Math.max(1, resetSeconds),
    };
  }

  // Record this request
  record.timestamps.push(now);
  rateLimitStore.set(clientIp, record);

  return {
    allowed: true,
    remaining: maxRequests - record.timestamps.length,
    resetSeconds: Math.ceil(windowMs / 1000),
  };
}

/**
 * Helper to reset rate limits (useful for test suites)
 */
export function resetRateLimitStore(): void {
  rateLimitStore.clear();
}
