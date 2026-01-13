import dayjs from 'dayjs'
import { memberVipOld } from '~/config/google-sheet/column-mapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phone-utils'

/**
 * @important - some of the data can be skipped if it satisfies this condition
 * 1. No email
 * 2. 'Date expired' value is lesser than current date
 * 3. 'New expiry date' has no value or its value is lesser than current date (No need to check if 'Date expired' field is greater than current date)
 */
export function transformMemberVipOld(rows: (string | number)[][]): User[] {
  const result: User[] = []
  const currentDate = dayjs()

  rows.forEach((row) => {
    const hasEmail = !!row[memberVipOld.email]
    const isExpired =
      currentDate.isAfter(dayjs(row[memberVipOld.expiry_date])) ||
      currentDate.isAfter(dayjs(row[memberVipOld.new_expiry_date]))

    if (hasEmail && !isExpired) {
      result.push({
        name: row[memberVipOld.name] as string,
        email: (row[memberVipOld.email] as string).toLowerCase(),
        phone: normalizeToE164(row[memberVipOld.phone] as string),
        membership_tier: 'member', // in our existing database, VIP members are called 'member'
        membership_expiry_date: (row[memberVipOld.new_expiry_date] as string)
          ? new Date(row[memberVipOld.new_expiry_date])
          : new Date('2026-12-31'),
        telegram_username: null,
      })
    }
  })

  return result
}
