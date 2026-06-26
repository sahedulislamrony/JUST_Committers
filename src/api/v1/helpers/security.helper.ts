// Regexes for detecting potential prompt injection patterns
const PROMPT_INJECTION_PATTERNS = [
  /ignore\s+(?:all\s+)?(?:previous\s+)?(?:instructions|rules|system\s+rules|directives|prompts)/gi,
  /system\s+override/gi,
  /you\s+are\s+now/gi,
  /developer\s+mode/gi,
  /act\s+as\s+(?:a|an)?/gi,
  /new\s+instruction/gi,
];

// Regexes to identify 4-6 digit codes identified as PINs, OTPs, or passwords
const PIN_PATTERNS = [
  /(pin|otp|passcode|password|cvv|verification\s*code|secret\s*code)\s*(?:code|number|is|:|:=|=|\s)*\b(\d{4,6})\b/gi,
  /\b(\d{4,6})\b\s*(?:is|as)?\s*(?:my\s*)?(pin|otp|passcode|password|cvv)\b/gi,
];

/**
 * Sanitizes a string by redacting potential prompt injection phrases and PIN/OTP secrets.
 */
export const sanitizeString = (text: string): string => {
  let sanitized = text;

  // 1. Sanitize prompt injections
  for (const pattern of PROMPT_INJECTION_PATTERNS) {
    sanitized = sanitized.replace(pattern, '[REDACTED_INSTRUCTION]');
  }

  // 2. Sanitize PINs / OTPs
  for (const pattern of PIN_PATTERNS) {
    sanitized = sanitized.replace(pattern, (match, group1, group2) => {
      // If group2 contains the digits (pattern 1)
      if (group2 && /^\d+$/.test(group2)) {
        return match.replace(group2, '[REDACTED_PIN]');
      }
      // If group1 contains the digits (pattern 2)
      if (group1 && /^\d+$/.test(group1)) {
        return match.replace(group1, '[REDACTED_PIN]');
      }
      return '[REDACTED_PIN]';
    });
  }

  return sanitized;
};

/**
 * Recursively scans and sanitizes all string properties in a request payload.
 */
export const sanitizePayload = <T>(data: T): T => {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'string') {
    return sanitizeString(data) as unknown as T;
  }

  if (Array.isArray(data)) {
    return data.map((item) => sanitizePayload(item)) as unknown as T;
  }

  if (typeof data === 'object') {
    const sanitizedObj: any = {};
    for (const key of Object.keys(data)) {
      sanitizedObj[key] = sanitizePayload((data as any)[key]);
    }
    return sanitizedObj as T;
  }

  return data;
};
