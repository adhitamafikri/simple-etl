import fs from 'node:fs'
import path from 'node:path'
import type { User, UserType } from '~/types/users'

/**
 * @description
 * This helper function will be used for writing transformation results to
 * their appropriate JSON files in 'artifacts/transformationResults' directory
 * ----
 * - admin transformation -> admin.transformation.json
 * - member Old VIP -> memberOldVip.transformation.json
 * - member VIP V1 transformation -> memberVipV1.transformation.json
 * - member VIP V2 transformation -> memberVipV2.transformation.json
 * - member VVIP transformation -> memberVvip.transformation.json
 */
export function writeTrasnformationResultToJson({
  transformationResult,
  userType,
}: {
  transformationResult: User[]
  userType: UserType
}) {
  const fileNameMapping: Record<UserType, string> = {
    admin: 'admin.transformation.json',
    memberVipOld: 'memberVipOld.transformation.json',
    memberVipV1: 'memberVipV1.transformation.json',
    memberVipV2: 'memberVipV2.transformation.json',
    memberVvip: 'memberVvip.transformation.json',
  }

  const filePath = path.resolve(
    process.cwd(),
    `./artifacts/transformationResults/${fileNameMapping[userType]}`,
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
