import { memberExtractor } from '~/extractors/googleSheet/member.extractor'
import { transformAdmin } from '~/transformers/googleSheet/admin.transformer'
import { transformMemberVipOld } from '~/transformers/googleSheet/memberVipOld.transformer'
import { transformMemberVipV1 } from '~/transformers/googleSheet/memberVipV1.transformer'
import { transformMemberVipV2 } from '~/transformers/googleSheet/memberVipV2.transformer'
import { transformMemberVvip } from '~/transformers/googleSheet/memberVvip.transformer'
import { writeTrasnformationResultToJson } from '~/utils/writeTransformationResultToJson'

export async function syncMembersJob() {
  // Extraction
  console.log('We are going to execute member sync job')
  const result = await memberExtractor()

  // Transformation
  console.log('We are going to execute member data transformation')
  const transformations = [
    transformAdmin(result.admin),
    transformMemberVipOld(result.memberVipOld),
    transformMemberVipV1(result.memberVipV1),
    // transformMemberVipV2(result.memberVipV2),
    // transformMemberVvip(result.memberVvip),
  ]
  const results = await Promise.allSettled(transformations)
  let totalMembers = 0

  if (results[0].status === 'fulfilled') {
    totalMembers += results[0].value.length
    writeTrasnformationResultToJson({
      transformationResult: results[0].value,
      userType: 'admin',
    })
  }

  if (results[1].status === 'fulfilled') {
    totalMembers += results[1].value.length
    writeTrasnformationResultToJson({
      transformationResult: results[1].value,
      userType: 'memberVipOld',
    })
  }
  if (results[2].status === 'fulfilled') {
    totalMembers += results[2].value.length
    writeTrasnformationResultToJson({
      transformationResult: results[2].value,
      userType: 'memberVipV1',
    })
  }
  // if (results[3].status === 'fulfilled') {
  //   totalMembers += results[3].value.length
  //   writeTrasnformationResultToJson({
  //     transformationResult: results[3].value,
  //     userType: 'memberVipV2',
  //   })
  // }
  // if (results[4].status === 'fulfilled') {
  //   totalMembers += results[4].value.length
  //   writeTrasnformationResultToJson({
  //     transformationResult: results[4].value,
  //     userType: 'memberVvip',
  //   })
  // }

  console.log(`The total member data from all the sheets is: ${totalMembers}`)

  // Loading
}
