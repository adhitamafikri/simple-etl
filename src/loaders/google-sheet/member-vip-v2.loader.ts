import fs from 'node:fs/promises'
import path from 'node:path'
import type { User } from '~/types/users'
import { upsertUsers } from '../core/user.loader'

export async function loadMemberVipV2Data(): Promise<void> {
  const filePath = path.resolve(
    process.cwd(),
    './artifacts/transformationResults/member-vip-v2-transformation.json',
  )

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const users: User[] = JSON.parse(fileContent)

    console.log(`Loading ${users.length} VIP V2 member users...`)
    await upsertUsers(users)
    console.log('VIP V2 member users loaded successfully')
  } catch (error) {
    console.error('Error loading VIP V2 member data:', error)
    throw error
  }
}
