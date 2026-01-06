import path from 'node:path'
import dotenv from 'dotenv'
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
      maintenance-dedupe        - Deduplicate member data by email (TBD)

    Example:
      bun run dev ingestion-sync-members
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
