export type UserType = 'admin' | 'memberVipOld' | 'memberVipV1' | 'memberVipV2' | 'memberVvip'

export type User = {
  name: string
  phone: string | null
  email: string | null
  telegram_username: string | null
  membership_tier: string | null
  membership_expiry_date: Date | null
}
