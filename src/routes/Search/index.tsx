import { Suspense, useMemo, useState } from 'react'
import _ from 'lodash'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Recommend from './Recommend'
import Setting from 'components/Setting/indes'
import Portal from 'components/Portal'

export default function Search() {
  const [deboVal, setDeboVal] = useState('')
  const [isMoblie, setIsMoblie] = useState(false)
  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /^[가-힣a-zA-Z0-9]+$/
        if (pattern.test(value)) setDeboVal(value)
        if (value === '') setDeboVal('')
      }, 1000),
    []
  )

  const handleClick = () => setIsMoblie((prev) => !prev)

  return (
    <>
      <Setting />
      <SearchInput isMoblie={isMoblie} debounceChange={debounceChange} handleClick={handleClick} />
      {deboVal !== '' && (
        <div className={styles.recommend}>
          <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
            <Recommend value={deboVal} />
          </Suspense>
        </div>
      )}
    </>
  )
}
