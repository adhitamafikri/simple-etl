import { adminColumnMapping } from '~/config/googleSheet/columnMapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phone-utils'

export function transformAdmin(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[adminColumnMapping.name] as string,
      email: row[adminColumnMapping.email] as string,
      phone: normalizeToE164(row[adminColumnMapping.phone] as string),
      membership_tier: null,
      membership_expiry_date: null,
      telegram_username: null,
    })
  })

  return result
}
