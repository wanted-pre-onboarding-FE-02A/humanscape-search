import { ChangeEvent, useState } from 'react'

import { SearchIcon } from 'assets/svgs'
import styles from './Humanscape.module.scss'
import { getDiseaseInfoApi } from 'services/diseaseInfoService'

import ItemCard from './Item'
import { Item } from 'types/diseaseInfo'
import { useQuery } from 'react-query'

const Humanscape = () => {
  const [text, setText] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const pattern = /^[가-힣a-zA-Z0-9]+$/

  const getApi = async () => {
    const res = await getDiseaseInfoApi({
      pageNo: 1,
      numOfRows: 7,
      sickType: 1,
      medTp: 2,
      diseaseType: 'SICK_NM',
      searchText: text,
      _type: 'json',
    })
    return res
  }

  const { isLoading, isError, data, error, refetch } = useQuery(['text', text], () => getApi, {
    enabled: !!text,
    refetchOnWindowFocus: false,
    retry: 0,
    onSuccess: (item: Item[]) => {
      setItems(item)
      console.log('success')
    },
    onError: (e: any) => {
      console.log(e)
      throw new Error('server error')
    },
  })

  // if (isLoading) {
  //   return <span>Loading...</span>
  // }

  // if (isError) {
  //   return <span>Error: {error.message}</span>
  // }

  const handleDebounce = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value
    setText(newText)

    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      if (pattern.test(newText) || text.length !== 0) {
        console.log('yes')
        refetch()
      } else {
        console.log('no')
      }
    }, 1000)

    setTimer(newTimer)
  }

  return (
    <div className={styles.humanscapce}>
      <header>
        <div className={styles.title}>
          <h1>국내 모든 임상시험 검색하고</h1>
          <h1>온라인으로 참여하기</h1>
        </div>
      </header>
      <main>
        <section>
          <form>
            <div className={styles.searchBox}>
              <SearchIcon />
              <input type='text' value={text} placeholder='질환명을 입력해 주세요.' onChange={handleDebounce} />
              <div className={styles.submitBox}>
                <button type='submit' className={styles.submitButton}>
                  검 색
                </button>
              </div>
            </div>
          </form>
        </section>
        <section>
          <div className={styles.resultBox}>
            <ul>
              {load && (
                <li>
                  <div className={styles.loading}>검색중.......</div>
                </li>
              )}
              {data && data.length !== undefined ? (
                data.map((item) => <ItemCard key={item.sickCd} item={item} />)
              ) : (
                <li>
                  <div>검색결과를 찾지 못했습니다.</div>
                </li>
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Humanscape
