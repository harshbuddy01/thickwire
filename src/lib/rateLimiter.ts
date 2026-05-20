interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
}

export interface ThrottleResult {
  allowed: boolean;
  retryAfter: number; // in milliseconds
}

class RateLimiterImpl {
  private limits: Map<string, RateLimitEntry> = new Map();
  private throttles: Map<string, number> = new Map();

  checkLimit(key: string, limit: number, windowMs: number): RateLimitResult {
    const now = Date.now();
    const entry = this.limits.get(key);

    if (!entry || now > entry.resetAt) {
      // Create new window
      const newEntry = {
        count: 1,
        resetAt: now + windowMs,
      };
      this.limits.set(key, newEntry);
      return {
        allowed: true,
        remaining: limit - 1,
        resetAt: new Date(newEntry.resetAt),
      };
    }

    if (entry.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(entry.resetAt),
      };
    }

    entry.count++;
    return {
      allowed: true,
      remaining: limit - entry.count,
      resetAt: new Date(entry.resetAt),
    };
  }

  throttle(key: string, delayMs: number): ThrottleResult {
    const now = Date.now();
    const lastCall = this.throttles.get(key);

    if (!lastCall || now - lastCall >= delayMs) {
      this.throttles.set(key, now);
      return { allowed: true, retryAfter: 0 };
    }

    const retryAfter = delayMs - (now - lastCall);
    return { allowed: false, retryAfter };
  }

  reset(key: string): void {
    this.limits.delete(key);
    this.throttles.delete(key);
  }
}

export const rateLimiter = new RateLimiterImpl();

// Rate limit configurations
export const RATE_LIMITS = {
  LOGIN: { limit: 5, windowMs: 60000 },          // 5 per minute
  PASSWORD_RESET: { limit: 3, windowMs: 300000 }, // 3 per 5 minutes
  SUPPORT_TICKET: { limit: 5, windowMs: 3600000 }, // 5 per hour
  REVIEW: { limit: 5, windowMs: 3600000 },         // 5 per hour
};

// Throttle configurations
export const THROTTLES = {
  ORDER_CREATE: 2000,   // 2 seconds
  PAYMENT_INIT: 3000,   // 3 seconds
  SUPPORT_SUBMIT: 5000, // 5 seconds
};
