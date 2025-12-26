/**
 * Normalizes a phone number to E.164 format.
 *
 * This function cleans up and formats a phone number string to produce a
 * standardized E.164 format (e.g., `+<country_code><number>`). It is
 * designed to handle various common phone number formats, with a
 * special focus on Indonesian numbers.
 *
 * The purpose of this function is to produce a proper phone number with the
 * country code in order to store it into our `users` table in Postgres.
 *
 * It handles formats like:
 * - `8xxxxxxxxx` -> `+628xxxxxxxxx`
 * - `08xxxxxxxx` -> `+628xxxxxxxx`
 * - `628xxxxxxx` -> `+628xxxxxxx`
 * - `+1(401) xxx-xxxx` -> `+1401xxxxxxx`
 * - `+62 xxx-xxxx-xxxx` -> `+62xxxxxxxxxxxx`
 *
 * @param phone The raw phone number string to normalize.
 * @returns The normalized phone number. If the country code cannot be
 *          determined, it returns the cleaned number digits.
 */
export function normalizeToE164(phone: string): string {
  // If the number starts with `+`, clean it and preserve valid country codes.
  // Only treat it as Indonesian local if the digits clearly lack a country code (e.g., "+0..." or "+8..." without a known code).
  if (phone.trim().startsWith('+')) {
    const digits = phone.replace(/[^\d]/g, '')

    // Preserve known country codes
    const threeDigitCodes = ['966', '971', '962', '964'] // Saudi Arabia, UAE, Jordan, Iraq
    for (const code of threeDigitCodes) {
      if (digits.startsWith(code)) {
        return `+${digits}`
      }
    }

    const twoDigitCodes = [
      '62', // Indonesia
      '65', // Singapore
      '61', // Australia
      '60', // Malaysia
      '63', // Philippines
      '64', // New Zealand
      '66', // Thailand
      '81', // Japan
      '82', // South Korea
      '84', // Vietnam
      '86', // China
      '44', // UK
      '49', // Germany
      '31', // Netherlands
      '33', // France
      '39', // Italy
      '34', // Spain
      '91', // India
      '92', // Pakistan
      '93', // Afghanistan
      '20', // Egypt
      '27', // South Africa
    ]
    for (const code of twoDigitCodes) {
      if (digits.startsWith(code)) {
        return `+${digits}`
      }
    }

    if (digits.startsWith('1') && digits.length >= 11) {
      return `+${digits}`
    }

    // Normalize "+0xxx" and "+8xxx" to Indonesian format
    if (digits.startsWith('0')) {
      return `+62${digits.substring(1)}`
    }
    if (digits.startsWith('8') && digits.length >= 9 && digits.length <= 13) {
      return `+62${digits}`
    }

    return `+${digits}`
  }

  // For numbers not starting with `+`, remove all non-digit characters.
  let cleanedPhone = phone.replace(/[^\d]/g, '')

  // Indonesian local formats - check before country codes to treat '8' and '0' starting numbers as Indonesian
  if (cleanedPhone.startsWith('0')) {
    return `+62${cleanedPhone.substring(1)}`
  }

  if (cleanedPhone.startsWith('8') && cleanedPhone.length >= 9 && cleanedPhone.length <= 13) {
    return `+62${cleanedPhone}`
  }

  // Apply rules for numbers with known country codes.
  // Handle common country codes used by KJO Academy users.

  // 3-digit country codes (must check first - more specific)
  const threeDigitCodes = ['966', '971', '962', '964'] // Saudi Arabia, UAE, Jordan, Iraq
  for (const code of threeDigitCodes) {
    if (cleanedPhone.startsWith(code)) {
      return `+${cleanedPhone}`
    }
  }

  // 2-digit country codes
  const twoDigitCodes = [
    '62', // Indonesia
    '65', // Singapore
    '61', // Australia
    '60', // Malaysia
    '63', // Philippines
    '64', // New Zealand
    '66', // Thailand
    '81', // Japan
    '82', // South Korea
    '84', // Vietnam
    '86', // China
    '44', // UK
    '49', // Germany
    '31', // Netherlands
    '33', // France
    '39', // Italy
    '34', // Spain
    '91', // India
    '92', // Pakistan
    '93', // Afghanistan
    '20', // Egypt
    '27', // South Africa
  ]
  for (const code of twoDigitCodes) {
    if (cleanedPhone.startsWith(code)) {
      return `+${cleanedPhone}`
    }
  }

  // 1-digit country code (USA/Canada)
  if (cleanedPhone.startsWith('1') && cleanedPhone.length >= 11) {
    return `+${cleanedPhone}`
  }

  // If no rules match, return the cleaned digits. The caller is responsible
  // for handling numbers where the country code could not be determined.
  return cleanedPhone
}

/**
 * Censors a phone number, showing only first 4 and last 4 digits.
 *
 * @param phone The phone number to censor
 * @returns The censored phone number
 */
export function censorPhone(phone: string): string {
  if (phone.length > 8) {
    return `${phone.substring(0, 4)}***${phone.substring(phone.length - 4)}`
  }

  return '***'
}
