import path from 'node:path'
import dotenv from 'dotenv'
import { adminIngestionJob } from '~/jobs/ingestion/admin-ingestion.job'
import { memberVipOldIngestionJob } from '~/jobs/ingestion/member-vip-old-ingestion.job'
import { memberVipV1IngestionJob } from '~/jobs/ingestion/member-vip-v1-ingestion.job'
import { memberVipV2IngestionJob } from '~/jobs/ingestion/member-vip-v2-ingestion.job'
import { memberVvipIngestionJob } from '~/jobs/ingestion/member-vvip-ingestion.job'
import { syncMembersJob } from '~/jobs/ingestion/sync-members.job'
import { dedupeMembersByEmailJob } from '~/jobs/maintenance/dedupe-members-by-email.job'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

function showUsage() {
  console.log(`
    Usage: bun run dev [job-name]

    Available jobs:
      ingestion-sync-members    - Sync member data from Google Sheets
      ingestion-admin           - Sync admin member data from Google Sheets
      ingestion-member-vip-old  - Sync member VIP Old data from Google Sheets
      ingestion-member-vip-v1   - Sync member VIP V1 data from Google Sheets
      ingestion-member-vip-v2   - Sync member VIP V2 data from Google Sheets
      ingestion-member-vvip     - Sync member VVIP data from Google Sheets
      maintenance-dedupe        - Deduplicate member data by email (TBD)

    Example:
      bun run dev ingestion-sync-members
      bun run dev ingestion-admin
      bun run dev ingestion-member-vip-old
      bun run dev ingestion-member-vip-v1
      bun run dev ingestion-member-vip-v2
      bun run dev ingestion-member-vvip
      bun run dev maintenance-dedupe
  `)
}

function main() {
  const jobName = process.argv[2]

  console.log('This is the main function', process.env.PG_DATABASE)
  console.log('Selected job:', jobName)

  switch (jobName) {
    case 'ingestion-sync-members':
      syncMembersJob()
      break
    case 'ingestion-admin':
      adminIngestionJob()
      break
    case 'ingestion-member-vip-old':
      memberVipOldIngestionJob()
      break
    case 'ingestion-member-vip-v1':
      memberVipV1IngestionJob()
      break
    case 'ingestion-member-vip-v2':
      memberVipV2IngestionJob()
      break
    case 'ingestion-member-vvip':
      memberVvipIngestionJob()
      break
    case 'maintenance-dedupe':
      dedupeMembersByEmailJob()
      break
    case undefined:
      console.log('No job specified, showing usage:')
      showUsage()
      break
    default:
      console.log(`Unknown job: ${jobName}`)
      showUsage()
      break
  }
}

main()
