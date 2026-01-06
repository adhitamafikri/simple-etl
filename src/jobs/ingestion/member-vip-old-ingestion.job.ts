import { memberVipOldExtractor } from '~/extractors/google-sheet/member-vip-old.extractor'
import { transformMemberVipOld } from '~/transformers/google-sheet/member-vip-old.transformer'
import { writeTrasnformationResultToJson } from '~/utils/write-transformation-result-to-json'

export async function memberVipOldIngestionJob() {
  // Extraction
  console.log('We are going to execute member VIP Old sync job')
  const memberVipOldData = await memberVipOldExtractor()

  // Transformation
  console.log('We are going to execute member VIP Old data transformation')
  const transformedMembers = await transformMemberVipOld(memberVipOldData)

  // Write transformation result to JSON
  writeTrasnformationResultToJson({
    transformationResult: transformedMembers,
    userType: 'memberVipOld',
  })

  console.log(`Successfully processed ${transformedMembers.length} member VIP Old records`)
}