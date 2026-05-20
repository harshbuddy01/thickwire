import * as Sentry from '@sentry/nextjs';

export interface SecurityEvent {
  type: 'csp_violation' | 'auth_failure' | 'validation_failure' | 'rate_limit_exceeded' | 'open_redirect_attempt';
  details: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

function redactSensitiveData(data: any): any {
  const sensitiveKeys = ['password', 'token', 'accessToken', 'refreshToken', 'apiKey', 'secret', 'card', 'cvv'];
  
  if (typeof data !== 'object' || data === null) return data;
  
  const redacted = Array.isArray(data) ? [...data] : { ...data };
  for (const key in redacted) {
    if (sensitiveKeys.some(k => key.toLowerCase().includes(k))) {
      redacted[key] = '[REDACTED]';
    } else if (typeof redacted[key] === 'object') {
      redacted[key] = redactSensitiveData(redacted[key]);
    }
  }
  
  return redacted;
}

export function initSentry() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    beforeSend(event) {
      // Filter sensitive details out of headers and requests
      if (event.request) {
        delete event.request.cookies;
        if (event.request.headers) {
          delete event.request.headers['Authorization'];
          delete event.request.headers['X-CSRF-Token'];
        }
      }
      
      if (event.extra) {
        event.extra = redactSensitiveData(event.extra);
      }
      
      return event;
    },
  });
}

export function captureSecurityEvent(event: SecurityEvent) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn(`[Security Event: ${event.type}] Severity: ${event.severity}`, event.details);
    return;
  }

  Sentry.captureMessage(`Security Event: ${event.type}`, {
    level: event.severity === 'critical' ? 'error' : 'warning',
    tags: {
      security_event: 'true',
      event_type: event.type,
      severity: event.severity,
    },
    extra: redactSensitiveData(event.details),
  });
}

export function logError(error: Error, context?: Record<string, any>) {
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error logged:', error, context);
    return;
  }

  Sentry.captureException(error, {
    extra: redactSensitiveData(context),
  });
}
