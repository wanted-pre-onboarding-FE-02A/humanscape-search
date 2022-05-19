import { ChangeEvent, FormEvent, Suspense, useMemo, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import styles from './Search.module.scss'

import { inputValue } from 'recoil/diseaseInfo'
import SearchInput from './SearchInput'
import Recommend from './Recommend'
import Setting from 'components/Setting/indes'
import _ from 'lodash'

export default function Search() {
  const [inputVal, setInputVal] = useState('')
  const [InputValDebo, setInputValDebo] = useState('')
  const setInputValue = useSetRecoilState(inputValue)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    // setInputVal(value)
    debounceSetInput(value)
    setInputValue(value)
  }
  const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])

  const handleSubmit = (value: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', value)
  }

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
