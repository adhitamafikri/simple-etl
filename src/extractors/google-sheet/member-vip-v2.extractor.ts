import { auth, sheets, type sheets_v4 } from '@googleapis/sheets'
import { sheetMapping } from '~/config/googleSheet/sheetMapping'

async function extractMemberVipV2Data({
  client,
}: {
  client: sheets_v4.Sheets
}): Promise<(string | number)[][]> {
  const selectedSheetRange = sheetMapping.memberVipV2

  return new Promise((resolve, reject) => {
    client.spreadsheets.values.get(
      {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: selectedSheetRange,
      },
      (err, res) => {
        if (err) {
          console.error('Failed when retrieving data from Member VIP V2 Sheets')
          return reject(err)
        }

        if (!res) {
          console.log('Empty Member VIP V2 data')
          return resolve([])
        }

        const rows = res?.data.values
        if (rows?.length) {
          return resolve(rows)
        }

        return reject('Empty Member VIP V2 data')
      },
    )
  })
}

export async function memberVipV2Extractor() {
  const googleAuth = new auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const client = await sheets({
    version: 'v4',
    auth: googleAuth,
  })

  const memberVipV2Data = await extractMemberVipV2Data({ client })

  return memberVipV2Data
}
