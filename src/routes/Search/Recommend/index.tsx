import { useQuery } from 'react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { settingAtom, dataLengthAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo.service'
import { Item } from 'types/diseaseInfo'
import RecommendItem from './RecommendItem'

interface IProps {
  value: string
  setInputVal: (inputVal: string) => void
}

export default function Recommend({ value, setInputVal }: IProps) {
  const { sickType, medTp } = useRecoilValue(settingAtom)
  const [, setLength] = useRecoilState(dataLengthAtom)

  const { data } = useQuery(
    ['getDiseaseInfoApi', sickType, medTp, value],
    () => getDiseaseInfoApi({ searchText: value, medTp, sickType }),
    {
      refetchOnWindowFocus: true,
      retry: 2,
      staleTime: 5 * 60 * 1000,
      suspense: true,
      onSuccess: (res) => {
        setLength(res.length)
      },
    }
  )

  if (!data) return null
  if (data.length === 0) return <div>검색 결과가 없습니다.</div>
  return (
    <ul>
      {data.map((item, index: number) => (
        <RecommendItem key={item.sickCd} item={item} index={index} setInputVal={setInputVal} />
      ))}
    </ul>
  )
}
