import fs from 'node:fs/promises'
import path from 'node:path'
import type { User } from '~/types/users'
import { upsertUsers } from '../core/userLoader'

export async function loadMemberVvipData(): Promise<void> {
  const filePath = path.resolve(
    process.cwd(),
    './artifacts/transformationResults/memberVvip.transformation.json',
  )

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const users: User[] = JSON.parse(fileContent)

    console.log(`Loading ${users.length} VVIP member users...`)
    await upsertUsers(users)
    console.log('VVIP member users loaded successfully')
  } catch (error) {
    console.error('Error loading VVIP member data:', error)
    throw error
  }
}
