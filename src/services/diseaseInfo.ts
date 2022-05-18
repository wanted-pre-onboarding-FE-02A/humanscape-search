import { axios } from 'hooks/worker'
import { IDiseaseInfoAPIRes } from 'types/diseaseInfo'

// proxy : http://apis.data.go.kr
const DISEASEINFO_BASE_URL = '/B551182/diseaseInfoService/getDissNameCodeList'

interface Params {
  sickType: number
  medTp: number
  searchText: string
}

export const getDiseaseInfoApi = (params: Params) =>
  axios.get<IDiseaseInfoAPIRes>(DISEASEINFO_BASE_URL, {
    params: {
      serviceKey: process.env.REACT_APP_API_KEY,
      pageNo: 1,
      numOfRows: 10,
      diseaseType: 'SICK_NM',
      _type: 'json',
      ...params,
    },
  })
