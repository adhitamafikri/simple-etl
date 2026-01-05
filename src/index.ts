import path from 'node:path'
import dotenv from 'dotenv'
import { syncMembersJob } from '~/jobs/ingestion/syncMembers.job'

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
})

function main() {
  console.log('This is the main function', process.env.PG_DATABASE)
  syncMembersJob()
}

main()
