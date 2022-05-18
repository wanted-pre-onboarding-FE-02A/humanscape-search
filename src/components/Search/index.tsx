import { SearchIcon } from 'assets/svgs'
import Loading from 'components/Loading'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './Search.module.scss'
import _ from 'lodash'

interface IProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ handleChange }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  // const [inputVal, setInputVal] = useState('')
  // const inputRef = useRef<HTMLInputElement>(null)
  // const pattern = /^[가-힣a-zA-Z0-9]+$/
  // useEffect(() => {
  //   if (!inputRef.current) return
  //   inputRef.current.focus()
  // }, [])

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget
  //   // setInputVal(value)
  //   if (pattern.test(value)) {
  //     debounceSetInput(value)
  //   }
  // }
  // const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])
  // console.log(inputVal)
  return (
    <>
      <SearchIcon className={styles.pcIcon} />
      <input
        className={styles.input}
        type='search'
        placeholder='질환명을 입력해 주세요.'
        ref={inputRef}
        // value={value}
        onChange={handleChange}
      />
      <SearchIcon className={styles.mobileIcon} />
    </>
  )
}
