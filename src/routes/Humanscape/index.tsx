import { ChangeEvent, FormEvent, useState } from 'react'

import { SearchIcon } from 'assets/svgs'
import styles from './Humanscape.module.scss'
import { getDiseaseInfoApi } from 'services/diseaseInfoService'

import ItemCard from './Item'

interface IData {
  sickCd: string
  sickNm: string
}

const Humanscape = () => {
  const [text, setText] = useState<string>('')
  const [items, setItems] = useState<IData[]>([])
  const [load, setLoad] = useState<boolean>(false)
  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value
    setText(newText)
    if (text.length) {
      setLoad(true)
      getDiseaseInfoApi({
        pageNo: 1,
        numOfRows: 10,
        sickType: 1,
        medTp: 2,
        diseaseType: 'SICK_NM',
        searchText: text,
        _type: 'json',
      })
        .then((res) => {
          if (res.data.response.body.totalCount > 0) {
            const newData = res.data.response.body.items.item
            setItems(newData)
          } else setItems([])
        })
        .catch(() => {
          setItems([])
        })
        .finally(() => setLoad(false))
    }
  }
  const handleSubmitText = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setItems([])
    setLoad(true)
    if (text.length) {
      getDiseaseInfoApi({
        pageNo: 1,
        numOfRows: 10,
        sickType: 1,
        medTp: 2,
        diseaseType: 'SICK_NM',
        searchText: text,
        _type: 'json',
      })
        .then((res) => {
          if (res.data.response.body.totalCount > 0) {
            const newData = res.data.response.body.items.item
            setItems(newData)
          } else setItems([])
        })
        .catch(() => {
          setItems([])
        })
        .finally(() => setLoad(false))
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
          <form onSubmit={handleSubmitText}>
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
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Humanscape
