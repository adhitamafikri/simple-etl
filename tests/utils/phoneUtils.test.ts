import { describe, expect, test } from 'bun:test'
import { normalizeToE164, censorPhone } from '~/utils/phoneUtils'

describe('normalizeToE164', () => {
  test.each([
    ['indonesian number with 0', '081234567890', '+6281234567890'],
    ['indonesian number with 62', '6281234567890', '+6281234567890'],
    ['indonesian number with 8', '81234567890', '+6281234567890'],
    ['international number with +', '+14015555555', '+14015555555'],
    ['international number with + and spaces', '+1 401 555 5555', '+14015555555'],
    ['international number with + and symbols', '+1 (401) 555-5555', '+14015555555'],
    ['the problematic number', '+86 18612269197', '+8618612269197'],
    ['number with leading and trailing spaces', '  +14015555555  ', '+14015555555'],
    ['number with only country code', '+62', '+62'],
    ['empty string', '', ''],
    ['just a plus', '+', '+'],
    ['indonesian number with symbols', '(0812) 3456-7890', '+6281234567890'],
    [
      'indonesian number with plus and leading 8 (treat as intl, keep +81)',
      '+81231272222',
      '+81231272222',
    ],
    ['indonesian number with plus and leading 0', '+081231272222', '+6281231272222'],
    ['japanese number with +81 stays intact', '+811234567890', '+811234567890'],
  ])('%s', (_, input, expected) => {
    expect(normalizeToE164(input)).toBe(expected)
  })
})

describe('censorPhone', () => {
  test.each([
    ['censors long phone numbers', '+6281234567890', '+628***7890'],
    ['censors with middle digits hidden', '081234567890', '0812***7890'],
    ['censors 9-digit numbers', '123456789', '1234***6789'],
    ['returns *** for 8-digit numbers', '12345678', '***'],
    ['returns *** for short numbers', '123', '***'],
    ['returns *** for empty strings', '', '***'],
    ['censors very long numbers', '+628123456789012345', '+628***2345'],
  ])('%s', (_, input, expected) => {
    expect(censorPhone(input)).toBe(expected)
  })
})
