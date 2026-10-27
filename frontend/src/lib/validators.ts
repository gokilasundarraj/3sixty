export interface NameValidationResult {
  isValid: boolean;
  error?: string;
}

const BLOCKED_NAMES = new Set([
  'test', 'testing', 'tester', 'dummy', 'fake', 'unknown',
  'anonymous', 'null', 'undefined', 'none', 'na', 'n/a',
  'sample', 'random', 'someone', 'asdf', 'asdfgh', 'qwerty',
  'admin', 'administrator', 'user', 'guest', 'nobody', 'no name',
  'noname', 'temp', 'temporary', 'demo', 'trial', 'abc', 'xyz',
  'asdfasdf', 'qwertyuiop'
]);

/**
 * Validates that a user-entered name is a plausible human name:
 * - At least 2 characters, maximum 50 characters
 * - Only alphabetic characters (including international accents), spaces, hyphens, dots, and apostrophes
 * - At least 2 actual letters
 * - No 3 or more repeated identical characters in a row (e.g. 'qqqqq', 'aaa')
 * - No repeated short sub-patterns (e.g. 'ababab', 'hahaha')
 * - Not a blocked placeholder or dummy name ('test', 'asdf', 'admin', etc.)
 * - Not a keyboard mash row ('qwerty', 'asdfgh', 'zxcvb')
 * - Each word > 2 letters must contain at least one vowel
 * - No single word exceeding 22 characters
 */
export function validateName(rawName: string): NameValidationResult {
  if (!rawName || typeof rawName !== 'string') {
    return { isValid: false, error: 'Please enter your full name.' };
  }

  const name = rawName.trim();

  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long.' };
  }

  if (name.length > 50) {
    return { isValid: false, error: 'Name must be 50 characters or fewer.' };
  }

  // Only allow letters, spaces, hyphens, apostrophes, and dots
  const allowedCharsRegex = /^[a-zA-ZÀ-ÿ\s'.–-]+$/;
  if (!allowedCharsRegex.test(name)) {
    return {
      isValid: false,
      error: 'Name can only contain letters, spaces, hyphens, and apostrophes (no numbers or special symbols).'
    };
  }

  // Must contain at least 2 alphabetic characters in total
  const letterMatches = name.match(/[a-zA-ZÀ-ÿ]/g);
  if (!letterMatches || letterMatches.length < 2) {
    return { isValid: false, error: 'Please enter a valid human name with letters.' };
  }

  // Cannot start or end with a hyphen or apostrophe
  if (/^['.–-]/.test(name) || /['.–-]$/.test(name)) {
    return { isValid: false, error: 'Name cannot start or end with a punctuation symbol.' };
  }

  // Cannot contain consecutive punctuation marks (e.g. "--", "..", "''")
  if (/['.–-]{2,}/.test(name)) {
    return { isValid: false, error: 'Name contains invalid consecutive symbols.' };
  }

  // No 3 or more consecutive identical characters (e.g. 'qqq', 'aaa', 'zzz')
  if (/(.)\1{2,}/i.test(name)) {
    return { isValid: false, error: 'Name cannot contain repeated identical characters.' };
  }

  // No repeating 2-4 character patterns (e.g. 'ababab', 'hahaha', 'asdasd')
  const noSpace = name.toLowerCase().replace(/\s+/g, '');
  if (/(.{2,4})\1{2,}/i.test(noSpace)) {
    return { isValid: false, error: 'Name appears to be random or repetitive text.' };
  }

  // Blocked dummy/fake names
  const cleanLower = name.toLowerCase();
  const normalized = cleanLower.replace(/[^a-z]/g, '');
  if (BLOCKED_NAMES.has(cleanLower) || BLOCKED_NAMES.has(normalized)) {
    return { isValid: false, error: 'Please enter your real full name, not a placeholder.' };
  }

  // Keyboard row mash check (e.g. 'asdfgh', 'qwerty', 'zxcvbn')
  const keyboardRows = [
    'qwertyuiop',
    'asdfghjkl',
    'zxcvbnm',
    'poiuytrewq',
    'lkjhgfdsa',
    'mnbvcxz'
  ];
  for (const row of keyboardRows) {
    if (row.includes(normalized) && normalized.length >= 4) {
      return { isValid: false, error: 'Please enter a valid name, not keyboard patterns.' };
    }
  }

  // Word-level inspection
  const words = name.split(/\s+/).filter(Boolean);
  const vowelRegex = /[aeiouyAEIOUYÀ-ÿ]/;

  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-ZÀ-ÿ]/g, '');
    if (cleanWord.length > 22) {
      return { isValid: false, error: 'Name contains an unusually long unbroken word.' };
    }
    // Words of 3+ letters must contain at least one vowel
    if (cleanWord.length >= 3 && !vowelRegex.test(cleanWord)) {
      return { isValid: false, error: 'Please enter a valid, pronounceable human name.' };
    }
  }

  return { isValid: true };
}

export function validatePhone(rawPhone: string): { isValid: boolean; error?: string } {
  const clean = String(rawPhone || '').replace(/\D/g, '');
  if (!clean) {
    return { isValid: false, error: 'Please enter your contact phone number.' };
  }
  if (clean.length !== 10) {
    return { isValid: false, error: 'Please enter a valid 10-digit phone number.' };
  }
  // Check if all digits are the same, e.g. 0000000000 or 1111111111
  if (/^(\d)\1{9}$/.test(clean)) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number, not repeated digits.' };
  }
  return { isValid: true };
}
