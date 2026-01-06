import { memberVipV2Extractor } from '~/extractors/google-sheet/member-vip-v2.extractor'
import { transformMemberVipV2 } from '~/transformers/google-sheet/member-vip-v2.transformer'
import { writeTrasnformationResultToJson } from '~/utils/write-transformation-result-to-json'

export async function memberVipV2IngestionJob() {
  // Extraction
  console.log('We are going to execute member VIP V2 sync job')
  const memberVipV2Data = await memberVipV2Extractor()

  // Transformation
  console.log('We are going to execute member VIP V2 data transformation')
  const transformedMembers = await transformMemberVipV2(memberVipV2Data)

  // Write transformation result to JSON
  writeTrasnformationResultToJson({
    transformationResult: transformedMembers,
    userType: 'memberVipV2',
  })

  console.log(`Successfully processed ${transformedMembers.length} member VIP V2 records`)
}
