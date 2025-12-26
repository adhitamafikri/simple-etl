import { memberVipV2 } from '~/config/columnMapping'
import type { User } from '~/types/users'

export function transformMemberVipV2(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[memberVipV2.name] as string,
      email: row[memberVipV2.email] as string | null,
      phone: row[memberVipV2.phone] as string,
      membership_expiry_date: (row[memberVipV2.expiry_date] as string)
        ? new Date(row[memberVipV2.expiry_date])
        : null,
      membership_tier: null,
    })
  })

  return result
}
