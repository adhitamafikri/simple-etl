import { auth, sheets, type sheets_v4 } from '@googleapis/sheets'
import { sheetMapping } from '~/config/google-sheet/sheet-mapping'
import type { UserType } from '~/types/users'

async function extractMemberData({
  client,
  userType,
}: {
  client: sheets_v4.Sheets
  userType: UserType
}): Promise<(string | number)[][]> {
  // const result: Record<string, unknown>[] = []
  const selectedSheetRange = sheetMapping[userType]

  // Database Admin
  return new Promise((resolve, reject) => {
    client.spreadsheets.values.get(
      {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: selectedSheetRange,
      },
      (err, res) => {
        if (err) {
          console.error('Failed when retrieving data from Admin Sheets')
          return reject(err)
        }

        if (!res) {
          console.log('Empty Admin data')
          return resolve([])
        }

        const rows = res?.data.values
        if (rows?.length) {
          return resolve(rows)
        }

        return reject('Empty Admin data')
      },
    )
  })
}

export async function memberExtractor() {
  const googleAuth = new auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const client = await sheets({
    version: 'v4',
    auth: googleAuth,
  })

  const admin = await extractMemberData({ client, userType: 'admin' })
  const memberVipOld = await extractMemberData({ client, userType: 'memberVipOld' })
  const memberVipV1 = await extractMemberData({ client, userType: 'memberVipV1' })
  const memberVipV2 = await extractMemberData({ client, userType: 'memberVipV2' })
  const memberVvip = await extractMemberData({ client, userType: 'memberVvip' })

  return {
    admin,
    memberVipOld,
    memberVipV1,
    memberVipV2,
    memberVvip,
  }
}
