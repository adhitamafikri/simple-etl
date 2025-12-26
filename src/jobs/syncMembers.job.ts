import { memberExtractor } from '~/extractors/googleSheet/member.extractor'
import { transformAdmin } from '~/transformers/googleSheet/admin.transformer'
import { transformMemberVipOld } from '~/transformers/googleSheet/memberVipOld.transformer'
import { transformMemberVipV1 } from '~/transformers/googleSheet/memberVipV1.transformer'
import { transformMemberVipV2 } from '~/transformers/googleSheet/memberVipV2.transformer'
import { transformMemberVvip } from '~/transformers/googleSheet/memberVvip.transformer'

export async function syncMembersJob() {
  console.log('We are going to execute member sync job')
  const result = await memberExtractor()

  console.log('We are going to execute member data transformation')
  const transformations = [
    transformAdmin(result.admin),
    transformMemberVipOld(result.memberVipOld),
    transformMemberVipV1(result.memberVipV1),
    transformMemberVipV2(result.memberVipV2),
    transformMemberVvip(result.memberVvip),
  ]
  const results = await Promise.allSettled(transformations)

  if (results[0].status === 'fulfilled') {
    console.log('The result from the transformAdmin', results[0].value)
  }
  if (results[1].status === 'fulfilled') {
    console.log('The result from the transformAdmin', results[1].value)
  }
  if (results[2].status === 'fulfilled') {
    console.log('The result from the transformAdmin', results[2].value)
  }
  if (results[3].status === 'fulfilled') {
    console.log('The result from the transformAdmin', results[3].value)
  }
  if (results[4].status === 'fulfilled') {
    console.log('The result from the transformAdmin', results[4].value)
  }
  console.log('result from extractor', results)
}
