import { Suspense, useMemo, useState } from 'react'
import _ from 'lodash'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Recommend from './Recommend'
import Setting from 'components/Setting/indes'

export default function Search() {
  const [deboVal, setDeboVal] = useState('')
  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /[가-힣]+$/
        if (pattern.test(value)) setDeboVal(value)
        if (value === '') setDeboVal('')
      }, 1000),
    []
  )

  return (
    <>
      <Setting />
      <SearchInput debounceChange={debounceChange} />
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
