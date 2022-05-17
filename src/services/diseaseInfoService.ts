import { axios } from 'hooks/worker'
import { useState } from 'react'
import { IDiseaseInfoAPIRes, Item } from 'types/diseaseInfo'

const DISEASEINFO_BASE_URL = '/getDissNameCodeList'

export interface Params {
  // serviceKey: string
  pageNo: number
  numOfRows: number
  sickType: number
  medTp: number
  diseaseType: string
  searchText: string
  _type: string
}

export const getDiseaseInfoApi = async (params: Params) => {
  try {
    const res = await axios.get<IDiseaseInfoAPIRes>(
      `${DISEASEINFO_BASE_URL}?serviceKey=${process.env.REACT_APP_API_KEY}`,
      { params }
    )
    const data = res.data.response.body.items.item
    const { totalCount } = res.data.response.body
    if (totalCount === 0) {
      return []
    }
    if (totalCount === 1) {
      const emptyData: Item[] = []
      return emptyData.concat(data)
    }

    return data
  } catch (error) {
    throw new Error('server Error')
  }
}

// export const useGetApi = (params: Params) => {
//   const [result, setResult] = useState<Item[]>([])
//   const [loading, setLoad] = useState<boolean>(false)
//   try {
//     setLoad(true)
//     getDiseaseInfoApi(params).then((res) => {
//       if (res.data.response.body.totalCount === 0) setResult(result)
//       if (res.data.response.body.totalCount === 1)
//         setResult((prev) => {
//           return prev.concat(res.data.response.body.items.item)
//         })
//       if (res.data.response.body.totalCount > 1) setResult(result)
//     })
//   } catch (error) {
//     setResult([])
//   } finally {
//     setLoad(false)
//   }

//   return [result, loading]
// }
