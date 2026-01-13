import { auth, sheets, type sheets_v4 } from '@googleapis/sheets'
import { sheetMapping } from '~/config/google-sheet/sheet-mapping'

async function extractMemberVvipData({
  client,
}: {
  client: sheets_v4.Sheets
}): Promise<(string | number)[][]> {
  const selectedSheetRange = sheetMapping.memberVvip

  return new Promise((resolve, reject) => {
    client.spreadsheets.values.get(
      {
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: selectedSheetRange,
      },
      (err, res) => {
        if (err) {
          console.error('Failed when retrieving data from Member VVIP Sheets')
          return reject(err)
        }

        if (!res) {
          console.log('Empty Member VVIP data')
          return resolve([])
        }

        const rows = res?.data.values
        if (rows?.length) {
          return resolve(rows)
        }

        return reject('Empty Member VVIP data')
      },
    )
  })
}

export async function memberVvipExtractor() {
  const googleAuth = new auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  })

  const client = await sheets({
    version: 'v4',
    auth: googleAuth,
  })

  const memberVvipData = await extractMemberVvipData({ client })

  return memberVvipData
}
