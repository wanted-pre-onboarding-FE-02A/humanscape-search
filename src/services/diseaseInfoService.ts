import { axios } from 'hooks/worker'
import { IDiseaseInfoAPIRes, Item } from 'types/diseaseInfo'

const DISEASEINFO_BASE_URL = '/getDissNameCodeList'

export interface Params {
  pageNo: number
  numOfRows: number
  sickType: number
  medTp: number
  diseaseType: string
  searchText: string
  _type: string
}

export const getDiseaseInfoApi = async (inputText: string) => {
  try {
    const res = await axios.get<IDiseaseInfoAPIRes>(
      `${DISEASEINFO_BASE_URL}?serviceKey=${process.env.REACT_APP_API_KEY}`,
      {
        params: {
          pageNo: 1,
          numOfRows: 10,
          sickType: 1,
          medTp: 2,
          diseaseType: 'SICK_NM',
          searchText: inputText,
          _type: 'json',
        },
      }
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
