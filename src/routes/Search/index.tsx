import { ChangeEvent, FormEvent, Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Recommend from 'components/Recommend'
import Setting from 'components/Setting/indes'
import _ from 'lodash'

export default function Search() {
  // const [inputVal, setInputVal] = useState('')
  const [InputValDebo, setInputValDebo] = useState('')

  // const pattern = /^[가-힣a-zA-Z0-9]+$/

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget
  //   // setInputVal(value)
  //   if (pattern.test(value)) {
  //     debounceSetInput(value)
  //   }
  // }
  // const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])

  const handleSubmit = (value: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', value)
  }

  return (
    <>
      <Setting />
      <SearchInput handleSubmit={handleSubmit} />

      {/* <SearchInput value={inputVal} handleChange={handleChange} handleSubmit={handleSubmit} /> */}
      {/* {inputVal !== '' && (
        <div className={styles.recommend}>
          <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
            <Recommend value={inputVal} />
          </Suspense>
        </div>
      )} */}
    </>
  )
}
