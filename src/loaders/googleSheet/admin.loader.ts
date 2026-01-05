import fs from 'node:fs/promises'
import path from 'node:path'
import type { User } from '~/types/users'
import { upsertUsers } from '../core/userLoader'

export async function loadAdminData(): Promise<void> {
  const filePath = path.resolve(
    process.cwd(),
    './artifacts/transformationResults/admin.transformation.json',
  )

  try {
    const fileContent = await fs.readFile(filePath, 'utf-8')
    const users: User[] = JSON.parse(fileContent)

    console.log(`Loading ${users.length} admin users...`)
    await upsertUsers(users)
    console.log('Admin users loaded successfully')
  } catch (error) {
    console.error('Error loading admin data:', error)
    throw error
  }
}
