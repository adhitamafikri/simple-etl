import { memberVipOld } from '~/config/columnMapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phoneUtils'

export function transformMemberVipOld(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    // Skip expired members
    if ((row[memberVipOld.status] as string).toLowerCase() !== 'expired') {
      result.push({
        name: row[memberVipOld.name] as string,
        email: row[memberVipOld.email] as string,
        phone: normalizeToE164(row[memberVipOld.phone] as string),
        membership_tier: 'member', // in our existing database, VIP members are called 'member'
        membership_expiry_date: (row[memberVipOld.new_expiry_date] as string)
          ? new Date(row[memberVipOld.new_expiry_date])
          : new Date('2026-12-31'),
      })
    }
  })

  return result
}
