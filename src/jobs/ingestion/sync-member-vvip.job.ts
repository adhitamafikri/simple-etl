import { memberVvipExtractor } from '~/extractors/google-sheet/member-vvip.extractor'
import { transformMemberVvip } from '~/transformers/google-sheet/member-vvip.transformer'
import { writeTrasnformationResultToJson } from '~/utils/write-transformation-result-to-json'

export async function syncMemberVvipJob() {
  // Extraction
  console.log('We are going to execute member VVIP sync job')
  const memberVvipData = await memberVvipExtractor()

  // Transformation
  console.log('We are going to execute member VVIP data transformation')
  const transformedMembers = await transformMemberVvip(memberVvipData)

  // Write transformation result to JSON
  writeTrasnformationResultToJson({
    transformationResult: transformedMembers,
    userType: 'memberVvip',
  })

  console.log(`Successfully processed ${transformedMembers.length} member VVIP records`)
}
