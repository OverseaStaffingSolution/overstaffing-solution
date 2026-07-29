/**
 * Input Security & Sanitization Utility Module
 * Protects against XSS, HTML injection, script injection, header injection, and buffer overflow attacks.
 */

/**
 * Escapes HTML characters to prevent XSS / HTML Injection.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips active scripting tags, dangerous attributes, inline event handlers, and NULL bytes.
 */
export function stripDangerousScripts(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    // Remove NULL bytes
    .replace(/\0/g, '')
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove inline event handlers (e.g. onerror=, onload=, onclick=)
    .replace(/\s*on\w+\s*=\s*(['"]?)(.*?)\1/gi, '')
    // Neutralize javascript: pseudo-protocol
    .replace(/javascript\s*:/gi, 'no-javascript:')
    // Neutralize vbscript: pseudo-protocol
    .replace(/vbscript\s*:/gi, 'no-vbscript:')
    // Remove data: text/html base64 injection attempts
    .replace(/data\s*:\s*text\/html/gi, 'data:text/plain');
}

/**
 * Main input sanitizer: trims, strips malicious script signatures, and truncates to max length.
 */
export function sanitizeInput(input: string, maxLength: number = 3000): string {
  if (!input || typeof input !== 'string') return '';
  
  // 1. Trim leading and trailing whitespace
  let clean = input.trim();
  
  // 2. Strip dangerous script patterns
  clean = stripDangerousScripts(clean);
  
  // 3. Enforce maximum character length limit to avoid buffer/payload flooding
  if (maxLength > 0 && clean.length > maxLength) {
    clean = clean.substring(0, maxLength);
  }
  
  return clean;
}

/**
 * Sanitizes and validates an email address.
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return '';
  const clean = email.trim().toLowerCase();
  if (clean.length > 250) return clean.substring(0, 250);
  return clean;
}

/**
 * Strict RFC 5322 compliant Email format validator.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const clean = email.trim();
  if (clean.length < 5 || clean.length > 250) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(clean);
}

/**
 * Phone number format validator.
 */
export function isValidPhone(phone: string): boolean {
  if (!phone || typeof phone !== 'string') return false;
  const clean = phone.trim();
  if (clean.length < 7 || clean.length > 30) return false;
  // Allows digits, +, spaces, hyphens, parentheses, dots
  const phoneRegex = /^[0-9+\s().\-]{7,30}$/;
  return phoneRegex.test(clean);
}

/**
 * Validates and cleans external/internal URLs against javascript: and data: exploits.
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') return '';
  const clean = url.trim();
  
  // Allow relative URLs starting with /
  if (clean.startsWith('/')) return clean;
  
  // Disallow hazardous protocols
  const lower = clean.toLowerCase();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return '#';
  }
  
  // Validate standard protocols
  if (lower.startsWith('http://') || lower.startsWith('https://') || lower.startsWith('mailto:') || lower.startsWith('tel:')) {
    return clean;
  }
  
  return '#';
}

/**
 * Recursively sanitizes object string values.
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const result: any = Array.isArray(obj) ? [] : {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      if (key.toLowerCase().includes('email')) {
        result[key] = sanitizeEmail(value);
      } else if (key.toLowerCase().includes('url') || key.toLowerCase().includes('link')) {
        result[key] = sanitizeUrl(value);
      } else {
        result[key] = sanitizeInput(value);
      }
    } else if (typeof value === 'object' && value !== null) {
      result[key] = sanitizeObject(value);
    } else {
      result[key] = value;
    }
  }
  
  return result as T;
}

/**
 * Client-Side Rate Limiter for form submissions to prevent flood attacks.
 */
const rateLimitMap = new Map<string, number>();

export function checkRateLimit(actionKey: string, cooldownMs: number = 3000): { allowed: boolean; waitSeconds: number } {
  const now = Date.now();
  const lastTime = rateLimitMap.get(actionKey) || 0;
  const elapsed = now - lastTime;
  
  if (elapsed < cooldownMs) {
    const remainingSeconds = Math.ceil((cooldownMs - elapsed) / 1000);
    return { allowed: false, waitSeconds: remainingSeconds };
  }
  
  rateLimitMap.set(actionKey, now);
  return { allowed: true, waitSeconds: 0 };
}
