import { memberVipV1 } from '~/config/columnMapping'
import type { User } from '~/types/users'
import { normalizeToE164 } from '~/utils/phoneUtils'

export function transformMemberVipV1(rows: (string | number)[][]): User[] {
  const result: User[] = []
  let expiryDate: Date

  rows.forEach((row) => {
    if (row[memberVipV1.expiry_date]) {
      expiryDate = new Date(row[memberVipV1.expiry_date])

      // Include only members with valid membership
      if (expiryDate > new Date()) {
        result.push({
          name: row[memberVipV1.name] as string,
          email: (row[memberVipV1.email] as string).toLowerCase(),
          phone: normalizeToE164(row[memberVipV1.phone] as string),
          membership_tier: 'member', // in our existing database, VIP members are called 'member'
          membership_expiry_date: expiryDate,
        })
      }
    }
  })

  return result
}
