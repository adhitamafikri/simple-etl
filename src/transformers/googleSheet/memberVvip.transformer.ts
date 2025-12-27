import { memberVvip } from '~/config/columnMapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phoneUtils'

export function transformMemberVvip(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[memberVvip.name] as string,
      email: (row[memberVvip.email] as string).toLowerCase(),
      phone: normalizeToE164(row[memberVvip.phone] as string),
      membership_tier: 'member-vvip',
      membership_expiry_date: (row[memberVvip.expiry_date] as string)
        ? new Date(row[memberVvip.expiry_date])
        : new Date('2026-12-31'),
    })
  })

  return result
}
