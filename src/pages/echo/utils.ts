/**
 * Generates a unique ID using crypto.randomUUID if available,
 * otherwise falls back to a timestamp-based ID with random suffix
 */
export function generateMessageId(role: string): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${crypto.randomUUID()}-${role}`;
  }
  // Fallback for environments without crypto.randomUUID
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}-${role}`;
}

/**
 * Removes all regex patterns from a string by replacing matches with replacement text
 */
export function removeRegexPatterns(
  text: string,
  regexes: RegExp[],
  replacement: string = ' See doc drawer. ',
): string {
  return regexes.reduce((acc, regex) => acc.replace(regex, replacement), text);
}

