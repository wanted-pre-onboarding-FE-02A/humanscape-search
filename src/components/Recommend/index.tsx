import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { inputValue, settingAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo'
import { Item } from 'types/diseaseInfo'
import RecommendItem from 'components/Recommend/RecommendItem'

export default function Recommend() {
  const { sickType, medTp } = useRecoilValue(settingAtom)
  const inputVal = useRecoilValue(inputValue)

  const { data } = useQuery(
    ['getDiseaseInfoApi', sickType, medTp, inputVal],
    () =>
      getDiseaseInfoApi({
        sickType,
        medTp,
        searchText: inputVal,
      }).then((res) => {
        if (res.data.response.body.totalCount === 1) {
          const emptyData: Item[] = []
          return emptyData.concat(res.data.response.body.items.item)
        }

        if (res.data.response.body.totalCount > 1) return res.data.response.body.items.item

        return []
      }),
    {
      refetchOnWindowFocus: true,
      suspense: true,
    }
  )

  if (!data) return null
  return (
    <ul>
      {data.map((item) => (
        <RecommendItem key={item.sickCd} item={item} />
      ))}
    </ul>
  )
}
