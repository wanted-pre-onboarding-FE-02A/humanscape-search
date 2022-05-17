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

  // KeyControl
  const [focusedIdx, setFocusedIdx] = useState<number>(-1)
  const handleKeyControl = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        if (focusedIdx >= items.length - 1) {
          setFocusedIdx(0)
          return
        }
        setFocusedIdx((prev) => prev + 1)
        break
      case 'ArrowUp':
        if (focusedIdx <= 0) {
          setFocusedIdx(items.length - 1)
          return
        }
        setFocusedIdx((prev) => prev - 1)
        break
    }
  }

  const handleSetText = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value
    setText(newText)
  }
  const handleSubmitText = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setItems([])
    setLoad(true)
    if (text.length) {
      getDiseaseInfoApi({
        pageNo: 1,
        numOfRows: 7,
        sickType: 1,
        medTp: 2,
        diseaseType: 'SICK_NM',
        searchText: text,
        _type: 'json',
      })
        .then((res) => {
          if (res.statusText === 'OK') {
            const newData = res.data.response.body.items.item
            setItems(newData)
          } else setItems([])
        })
        .finally(() => setLoad(false))
    }
  }

  return (
    <div className={styles.humanscape}>
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
              <input
                type='text'
                placeholder='질환명을 입력해 주세요.'
                onChange={handleSetText}
                value={text}
                onKeyDown={handleKeyControl}
              />
              <div className={styles.submitBox}>
                <button type='submit' className={styles.submitButton}>
                  검색
                </button>
              </div>
            </div>
          </form>
        </section>
        <section>
          <div className={styles.resultBox}>
            <ul>
              {load === true && (
                <li>
                  <div className={styles.loading}>검색중.......</div>
                </li>
              )}
              {items.length > 0 && <p className={styles.label}>추천검색어</p>}
              {items?.map((item, index) => (
                <ItemCard
                  key={item.sickCd}
                  item={item}
                  index={index}
                  focusedIdx={focusedIdx}
                  setText={setText}
                  setFocusedIdx={setFocusedIdx}
                />
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Humanscape
