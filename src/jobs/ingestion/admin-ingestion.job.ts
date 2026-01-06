import { adminExtractor } from '~/extractors/google-sheet/admin.extractor'
import { transformAdmin } from '~/transformers/google-sheet/admin.transformer'
import { writeTrasnformationResultToJson } from '~/utils/write-transformation-result-to-json'

export async function adminIngestionJob() {
  // Extraction
  console.log('We are going to execute admin member sync job')
  const adminData = await adminExtractor()

  // Transformation
  console.log('We are going to execute admin data transformation')
  const transformedAdmins = await transformAdmin(adminData)

  // Write transformation result to JSON
  writeTrasnformationResultToJson({
    transformationResult: transformedAdmins,
    userType: 'admin',
  })

  console.log(`Successfully processed ${transformedAdmins.length} admin records`)
}
