import { adminColumnMapping } from '~/config/columnMapping'
import type { User } from '~/types/users'

export function transformAdmin(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[adminColumnMapping.name] as string,
      email: row[adminColumnMapping.email] as string,
      phone: row[adminColumnMapping.phone] as string,
      membership_tier: null,
      membership_expiry_date: null,
    })
  })

  return result
}
