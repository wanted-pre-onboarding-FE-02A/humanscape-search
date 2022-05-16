import { axios } from 'hooks/worker'
import { IDiseaseInfoAPIRes } from 'types/diseaseInfo'

const DISEASEINFO_BASE_URL = '/getDissNameCodeList'

interface Params {
  // serviceKey: string
  pageNo: number
  numOfRows: number
  sickType: number
  medTp: number
  diseaseType: string
  searchText: string
  _type: string
}

export const getDiseaseInfoApi = (params: Params) =>
  axios.get<IDiseaseInfoAPIRes>(`${DISEASEINFO_BASE_URL}?serviceKey=${process.env.REACT_APP_API_KEY}`, { params })
