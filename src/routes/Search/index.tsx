import { ChangeEvent, Suspense, useMemo, useState } from 'react'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Recommend from './Recommend'
import Setting from 'components/Setting/indes'
import _ from 'lodash'

// const pattern = /^[가-힣a-zA-Z0-9]+$/
// if (pattern.test(value) && value.length !== 0) {
// }
export default function Search() {
  const [inputVal, setInputVal] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    debounceSetInput(value)
  }
  const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])

  return (
    <>
      <Setting />
      <SearchInput handleChange={handleChange} />
      {inputVal !== '' && (
        <div className={styles.recommend}>
          <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
            <Recommend value={inputVal} />
          </Suspense>
        </div>
      )}
    </>
  )
}
