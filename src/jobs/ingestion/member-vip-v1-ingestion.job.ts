import { memberVipV1Extractor } from '~/extractors/google-sheet/member-vip-v1.extractor'
import { transformMemberVipV1 } from '~/transformers/google-sheet/member-vip-v1.transformer'
import { writeTrasnformationResultToJson } from '~/utils/write-transformation-result-to-json'

export async function memberVipV1IngestionJob() {
  // Extraction
  console.log('We are going to execute member VIP V1 sync job')
  const memberVipV1Data = await memberVipV1Extractor()

  // Transformation
  console.log('We are going to execute member VIP V1 data transformation')
  const transformedMembers = await transformMemberVipV1(memberVipV1Data)

  // Write transformation result to JSON
  writeTrasnformationResultToJson({
    transformationResult: transformedMembers,
    userType: 'memberVipV1',
  })

  console.log(`Successfully processed ${transformedMembers.length} member VIP V1 records`)
}
