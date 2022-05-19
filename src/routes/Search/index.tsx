import { Suspense, useMemo, useState } from 'react'
import _ from 'lodash'
import styles from './Search.module.scss'
import { useSetRecoilState } from 'recoil'

import SearchInput from './SearchInput'
import Recommend from './Recommend'
import Setting from 'components/Setting/indes'
import { inputValue } from 'recoil/diseaseInfo'

export default function Search() {
  const [deboVal, setDeboVal] = useState('')
  const [isMoblie, setIsMoblie] = useState(false)
  const setInputValue = useSetRecoilState(inputValue)

  const debounceChange = useMemo(
    () =>
      _.debounce((value) => {
        const pattern = /[가-힣]+$/
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
            <Recommend value={deboVal} setInputValue={setInputValue} />
          </Suspense>
        </div>
      )}
    </>
  )
}
