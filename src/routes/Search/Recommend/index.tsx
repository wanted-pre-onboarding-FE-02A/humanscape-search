import { useQuery } from 'react-query'
import { useRecoilValue, useRecoilState } from 'recoil'
import { settingAtom, dataLengthAtom } from 'recoil/diseaseInfo'
import { getDiseaseInfoApi } from 'services/diseaseInfo'
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
    () =>
      getDiseaseInfoApi({
        sickType,
        medTp,
        searchText: value,
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
      onSuccess: (res) => {
        setLength(res.length)
      },
    }
  )

  if (!data) return null
  return (
    <ul>
      {data.map((item, index: number) => (
        <RecommendItem key={item.sickCd} item={item} index={index} setInputVal={setInputVal} />
      ))}
    </ul>
  )
}
