import fs from 'node:fs/promises'
import path from 'node:path'
import type { User } from '~/types/users'
import { upsertUsers } from '../core/userLoader'

export async function loadMemberVipOldData(): Promise<void> {
  const filePath = path.resolve(
    process.cwd(),
    './artifacts/transformationResults/memberVipOld.transformation.json',
  )

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const users: User[] = JSON.parse(fileContent)

    console.log(`Loading ${users.length} Old VIP member users...`)
    await upsertUsers(users)
    console.log('Old VIP member users loaded successfully')
  } catch (error) {
    console.error('Error loading Old VIP member data:', error)
    throw error
  }
}
