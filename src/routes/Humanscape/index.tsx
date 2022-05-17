import { ChangeEvent, useState } from 'react'

import { SearchIcon } from 'assets/svgs'
import styles from './Humanscape.module.scss'
import { getDiseaseInfoApi } from 'services/diseaseInfoService'

import ItemCard from './Item'
import { Item } from 'types/diseaseInfo'

const Humanscape = () => {
  const [text, setText] = useState<string>('')
  const [load, setLoad] = useState<boolean>(false)
  const [items, setItems] = useState<Item[]>([])
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const handleSetText = async (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value
    setLoad(true)
    setText(newText)
    if (timer) {
      clearTimeout(timer)
    }
    const newTimer = setTimeout(() => {
      try {
        setItems([])
        getApi(newText)
      } catch (error) {
        setItems([])
      }
    }, 1000)
    setTimer(newTimer)
    setLoad(false)
  }
  const getApi = (inputText: string) => {
    try {
      getDiseaseInfoApi({
        pageNo: 1,
        numOfRows: 10,
        sickType: 1,
        medTp: 2,
        diseaseType: 'SICK_NM',
        searchText: inputText,
        _type: 'json',
      }).then((res) => {
        if (res.data.response.body.totalCount === 0) setItems([])
        if (res.data.response.body.totalCount === 1)
          setItems((prev) => {
            return prev.concat(res.data.response.body.items.item)
          })
        if (res.data.response.body.totalCount > 1) setItems(res.data.response.body.items.item)
      })
    } catch (error) {
      console.log(error)
    }
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
              <input type='text' value={text} placeholder='질환명을 입력해 주세요.' onChange={handleSetText} />
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
              {items.map((item) => (
                <ItemCard key={item.sickCd} item={item} />
              ))}
              {items.length === 0 && (
                <li>
                  <div className={styles.loading}>검색결과를 찾지 못했습니다.</div>
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
