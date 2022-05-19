import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { settingAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo.service'
import { Item } from 'types/diseaseInfo'
import { createFuzzyMatcher, getDistance } from 'utils/string'
import RecommendItem from './RecommendItem'

interface IProps {
  value: string
}

export default function Recommend({ value }: IProps) {
  const { sickType, medTp } = useRecoilValue(settingAtom)
  const { data } = useQuery<Item[]>(
    ['getDiseaseInfoApi', sickType, medTp, value],
    () => getDiseaseInfoApi({ searchText: value, medTp, sickType }),
    {
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 5 * 60 * 1000,
      suspense: true,
    }
  )

  // const regex = createFuzzyMatcher(value)
  // const tmp = data?.map((item) => ({
  //   ...item,
  //   distance: getDistance(regex, item.sickNm),
  // }))

  const tmp = [
    {
      sickNm: '간지염',
      distance: { between: 1, offset: 0 },
    },
    {
      sickNm: '나가는간염',
      distance: { between: 0, offset: 3 },
    },
    {
      sickNm: '간염정도',
      distance: { between: 0, offset: 0 },
    },
  ]

  tmp?.sort((a, b) => {
    if (!a.distance || !b.distance) return 0

    if (a.distance.between === b.distance.between) {
      console.log('offset', a, b)
      return a.distance.offset - b.distance.offset
    }
    console.log('btw', a, b)
    return a.distance.between - b.distance.between
  })

  console.log(tmp)

  if (!data) return null
  if (data.length === 0) return <div>검색 결과가 없습니다.</div>
  return (
    <ul>
      {data.map((item) => (
        <RecommendItem key={item.sickCd} item={item} />
      ))}
    </ul>
  )
}
