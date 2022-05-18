import { ChangeEvent, useCallback, useState } from 'react'

import { SearchIcon } from 'assets/svgs'
import styles from './Humanscape.module.scss'
import { getDiseaseInfoApi } from 'services/diseaseInfoService'

import ItemCard from './Item'
import { Item } from 'types/diseaseInfo'
import { useQuery } from 'react-query'

const pattern = /^[가-힣a-zA-Z0-9]+$/
const Humanscape = () => {
  const [text, setText] = useState<string>('')
  // const [items, setItems] = useState<Item[]>([])
  const [timer, setTimer] = useState<NodeJS.Timeout>()

  const { isLoading, data, isError } = useQuery<Item[]>(['text', text], () => getDiseaseInfoApi(text), {
    enabled: !!text,
    refetchOnWindowFocus: false,
    retry: 0,
    staleTime: 5 * 60 * 1000,
    onSuccess: (item: Item[]) => {
      // setItems(item)
    },
    onError: () => {
      throw new Error('server error')
    },
  })

  const onChangeInputText = (e: ChangeEvent<HTMLInputElement>) => {
    const newText = e.currentTarget.value

    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(() => {
      if (pattern.test(newText) && newText.length !== 0) {
        setText(newText)
      }
    }, 1000)
    setTimer(newTimer)
  }

  const LoadingComponent = useCallback(() => {
    return isLoading ? (
      <li>
        <div className={styles.loading}>검색중입니다......</div>
      </li>
    ) : null
  }, [isLoading])

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
          <div className={styles.searchBox}>
            <SearchIcon />
            <input type='text' placeholder='질환명을 입력해 주세요.' onChange={onChangeInputText} />
            <div className={styles.submitBox}>
              <button type='submit' className={styles.submitButton}>
                검 색
              </button>
            </div>
          </div>
        </section>
        <section>
          <div className={styles.resultBox}>
            <ul>
              {LoadingComponent()}
              {data?.map((item) => (
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
