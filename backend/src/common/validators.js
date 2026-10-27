export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const BLOCKED_NAMES = new Set([
  'test', 'testing', 'tester', 'dummy', 'fake', 'unknown',
  'anonymous', 'null', 'undefined', 'none', 'na', 'n/a',
  'sample', 'random', 'someone', 'asdf', 'asdfgh', 'qwerty',
  'admin', 'administrator', 'user', 'guest', 'nobody', 'no name',
  'noname', 'temp', 'temporary', 'demo', 'trial', 'abc', 'xyz',
  'asdfasdf', 'qwertyuiop'
]);

/**
 * Validates that a user-entered name is a plausible human name
 * @param {string} rawName
 * @returns {{ isValid: boolean, error?: string }}
 */
export function validateName(rawName) {
  if (!rawName || typeof rawName !== 'string') {
    return { isValid: false, error: 'Please provide a valid name.' };
  }

  const name = rawName.trim();

  if (name.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long.' };
  }

  if (name.length > 50) {
    return { isValid: false, error: 'Name must be 50 characters or fewer.' };
  }

  const allowedCharsRegex = /^[a-zA-ZÀ-ÿ\s'.–-]+$/;
  if (!allowedCharsRegex.test(name)) {
    return {
      isValid: false,
      error: 'Name can only contain letters, spaces, hyphens, and apostrophes (no numbers or special symbols).'
    };
  }

  const letterMatches = name.match(/[a-zA-ZÀ-ÿ]/g);
  if (!letterMatches || letterMatches.length < 2) {
    return { isValid: false, error: 'Please enter a valid human name with letters.' };
  }

  if (/^['.–-]/.test(name) || /['.–-]$/.test(name)) {
    return { isValid: false, error: 'Name cannot start or end with a punctuation symbol.' };
  }

  if (/['.–-]{2,}/.test(name)) {
    return { isValid: false, error: 'Name contains invalid consecutive symbols.' };
  }

  if (/(.)\1{2,}/i.test(name)) {
    return { isValid: false, error: 'Name cannot contain repeated identical characters.' };
  }

  const noSpace = name.toLowerCase().replace(/\s+/g, '');
  if (/(.{2,4})\1{2,}/i.test(noSpace)) {
    return { isValid: false, error: 'Name appears to be random or repetitive text.' };
  }

  const cleanLower = name.toLowerCase();
  const normalized = cleanLower.replace(/[^a-z]/g, '');
  if (BLOCKED_NAMES.has(cleanLower) || BLOCKED_NAMES.has(normalized)) {
    return { isValid: false, error: 'Please enter a real full name, not a placeholder.' };
  }

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

  const words = name.split(/\s+/).filter(Boolean);
  const vowelRegex = /[aeiouyAEIOUYÀ-ÿ]/;

  for (const word of words) {
    const cleanWord = word.replace(/[^a-zA-ZÀ-ÿ]/g, '');
    if (cleanWord.length > 22) {
      return { isValid: false, error: 'Name contains an unusually long unbroken word.' };
    }
    if (cleanWord.length >= 3 && !vowelRegex.test(cleanWord)) {
      return { isValid: false, error: 'Please enter a valid, pronounceable human name.' };
    }
  }

  return { isValid: true };
}
