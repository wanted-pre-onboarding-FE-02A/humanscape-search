import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'
import { settingAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo.service'
import { Item } from 'types/diseaseInfo'
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
