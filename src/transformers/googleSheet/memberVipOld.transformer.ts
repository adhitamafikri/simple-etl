import { memberVipOld } from '~/config/columnMapping'
import type { User } from '~/types/users'

export function transformMemberVipOld(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[memberVipOld.name] as string,
      email: row[memberVipOld.email] as string,
      phone: row[memberVipOld.phone] as string,
      membership_expiry_date: (row[memberVipOld.new_expiry_date] as string)
        ? new Date(row[memberVipOld.new_expiry_date])
        : null,
      membership_tier: null,
    })
  })

  return result
}
