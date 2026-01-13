import dayjs from 'dayjs'
import { memberVipV1 } from '~/config/google-sheet/column-mapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phone-utils'

/**
 * @important - Make sure to skip these user data if they meet these conditions
 * 1. No email
 * 2. 'Expiry Date' value is lesser than current date
 */
export function transformMemberVipV1(rows: (string | number)[][]): User[] {
  const result: User[] = []
  const currentDate = dayjs()

  rows.forEach((row) => {
    const hasEmail = !!row[memberVipV1.email]
    const isExpired = currentDate.isAfter(dayjs(row[memberVipV1.expiry_date]))

    if (hasEmail && !isExpired) {
      result.push({
        name: row[memberVipV1.name] as string,
        email: (row[memberVipV1.email] as string).toLowerCase(),
        phone: normalizeToE164(row[memberVipV1.phone] as string),
        membership_tier: 'member', // in our existing database, VIP members are called 'member'
        membership_expiry_date: (row[memberVipV1.expiry_date] as string)
          ? new Date(row[memberVipV1.expiry_date])
          : new Date('2026-12-31'),
        telegram_username: (row[memberVipV1.telegram_username] as string) || null,
      })
    }
  })

  return result
}
