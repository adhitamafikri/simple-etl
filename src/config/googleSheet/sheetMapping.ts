// export const sheetMapping = {
//   admin: process.env.APP_ENV === 'production' ? 'Database Admin!A3:C' : '(DEV) Database Admin!A3:C',
//   memberVipOld:
//     process.env.APP_ENV === 'production'
//       ? 'Old Database (Devy)!A2:O'
//       : '(DEV) Old Database (Devy)!A2:O',
//   memberVipV1:
//     process.env.APP_ENV === 'production'
//       ? 'Database v1 (Cut Off Jul 2025)!A2:O'
//       : '(DEV) Database v1!A2:O',
//   memberVipV2:
//     process.env.APP_ENV === 'production' ? 'Database v2!A3:O' : '(DEV) Database Member!A3:O',
//   memberVvip:
//     process.env.APP_ENV === 'production'
//       ? 'Database Member VVIP!A3:E'
//       : '(DEV) Database Member VVIP!A3:E',
// } as const

export const sheetMapping = {
  admin: 'Database Admin!A3:C',
  memberVipOld: 'Old Database (Devy)!A2:O',
  memberVipV1: 'Database v1 (Cut Off Jul 2025)!A2:O',
  memberVipV2: 'Database v2!A3:O',
  memberVvip: 'Database Member VVIP!A3:E',
} as const
