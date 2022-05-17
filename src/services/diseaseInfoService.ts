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

export const getDiseaseInfoApi = async (params: Params) => {
  try {
    const res = await axios.get<IDiseaseInfoAPIRes>(
      `${DISEASEINFO_BASE_URL}?serviceKey=${process.env.REACT_APP_API_KEY}`,
      { params }
    )
    const { item } = res.data.response.body.items
    const { totalCount } = res.data.response.body
    if (totalCount === 0) return []
    if (totalCount === 1) {
      const emptyData: Item[] = []
      return emptyData.concat(item)
    }
    return item
  } catch (error) {
    throw new Error('server Error')
  }
}
