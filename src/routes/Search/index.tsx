import { ChangeEvent, FormEvent, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Recommend from './Recommend'
import Setting from 'components/Setting/indes'
import _ from 'lodash'

export default function Search() {
  const [inputVal, setInputVal] = useState('')
  const [InputValDebo, setInputValDebo] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    // setInputVal(value)
    debounceSetInput(value)
  }
  const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])

  const handleSubmit = (value: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', value)
  }

  console.log(inputVal)
  return (
    <>
      <Setting />
      <SearchInput value={inputVal} handleChange={handleChange} handleSubmit={handleSubmit} />
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
