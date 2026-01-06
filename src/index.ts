import path from 'node:path'
import dotenv from 'dotenv'
import { syncAdminJob } from '~/jobs/ingestion/sync-admin.job'
import { syncMemberVipOldJob } from '~/jobs/ingestion/sync-member-vip-old.job'
import { syncMemberVipV1Job } from '~/jobs/ingestion/sync-member-vip-v1.job'
import { syncMemberVipV2Job } from '~/jobs/ingestion/sync-member-vip-v2.job'
import { syncMemberVvipJob } from '~/jobs/ingestion/sync-member-vvip.job'
import { syncMembersJob } from '~/jobs/ingestion/sync-members.job'
import { dedupeMembersByEmailJob } from '~/jobs/maintenance/dedupe-members-by-email.job'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

function showUsage() {
  console.log(`
    Usage: bun run exec [job-name]

    Available jobs:
      sync-members              - Sync all member data from Google Sheets
      sync-admin                - Sync admin member data from Google Sheets
      sync-member-vip-old       - Sync member VIP Old data from Google Sheets
      sync-member-vip-v1        - Sync member VIP V1 data from Google Sheets
      sync-member-vip-v2        - Sync member VIP V2 data from Google Sheets
      sync-member-vvip          - Sync member VVIP data from Google Sheets
      maintenance-dedupe        - Deduplicate member data by email

    Example:
      bun run exec sync-members
      bun run exec sync-admin
      bun run exec sync-member-vip-old
      bun run exec sync-member-vip-v1
      bun run exec sync-member-vip-v2
      bun run exec sync-member-vvip
      bun run exec maintenance-dedupe
  `)
}

function main() {
  const jobName = process.argv[2]

  console.log('This is the main function', process.env.PG_DATABASE)
  console.log('Selected job:', jobName)

  switch (jobName) {
    case 'sync-members':
      syncMembersJob()
      break
    case 'sync-admin':
      syncAdminJob()
      break
    case 'sync-member-vip-old':
      syncMemberVipOldJob()
      break
    case 'sync-member-vip-v1':
      syncMemberVipV1Job()
      break
    case 'sync-member-vip-v2':
      syncMemberVipV2Job()
      break
    case 'sync-member-vvip':
      syncMemberVvipJob()
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
