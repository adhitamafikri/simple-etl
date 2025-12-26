import { memberVipV1 } from '~/config/columnMapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phoneUtils'

export function transformMemberVipV1(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[memberVipV1.name] as string,
      email: null,
      phone: normalizeToE164(row[memberVipV1.phone] as string),
      membership_expiry_date: (row[memberVipV1.expiry_date] as string)
        ? new Date(row[memberVipV1.expiry_date])
        : null,
      membership_tier: row[memberVipV1.membership_tier] as string | null,
    })
  })

  return result
}
