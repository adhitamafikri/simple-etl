import { memberVipV2 } from '~/config/googleSheet/columnMapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phone-utils'

export function transformMemberVipV2(rows: (string | number)[][]): User[] {
  const result: User[] = []

  rows.forEach((row) => {
    result.push({
      name: row[memberVipV2.name] as string,
      email: (row[memberVipV2.email] as string).toLowerCase(),
      phone: normalizeToE164(row[memberVipV2.phone] as string),
      membership_tier: 'member', // in our existing database, VIP members are called 'member'
      membership_expiry_date: (row[memberVipV2.expiry_date] as string)
        ? new Date(row[memberVipV2.expiry_date])
        : new Date('2026-12-31'),
      telegram_username: null,
    })
  })

  return result
}
