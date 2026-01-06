import fs from 'node:fs'
import path from 'node:path'
import type { User, UserType } from '~/types/users'

/**
 * @description
 * This helper function will be used for writing transformation results to
 * their appropriate JSON files in 'artifacts/transformation-results' directory
 * ----
 * - admin transformation -> admin-transformation.json
 * - member Old VIP -> member-vip-old-transformation.json
 * - member VIP V1 transformation -> member-vip-v1-transformation.json
 * - member VIP V2 transformation -> member-vip-v2-transformation.json
 * - member VVIP transformation -> member-vvip-transformation.json
 */
export function writeTrasnformationResultToJson({
  transformationResult,
  userType,
}: {
  transformationResult: User[]
  userType: UserType
}) {
  const fileNameMapping: Record<UserType, string> = {
    admin: 'admin-transformation.json',
    memberVipOld: 'member-vip-old-transformation.json',
    memberVipV1: 'member-vip-v1-transformation.json',
    memberVipV2: 'member-vip-v2-transformation.json',
    memberVvip: 'member-vvip-transformation.json',
  }

  const filePath = path.resolve(
    process.cwd(),
    `./artifacts/transformation-results/${fileNameMapping[userType]}`,
  )
  const content = JSON.stringify(transformationResult, null, 2)
  fs.writeFile(filePath, content, (error: NodeJS.ErrnoException | null) => {
    if (error) {
      console.error('Error when writing transformation file', error)
    } else {
      console.log('Success writing transformation file')
    }
  })
}
