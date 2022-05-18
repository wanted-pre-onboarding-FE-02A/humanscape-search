import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'

interface IProps {
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
}

export default function SearchInput({ debounceChange }: IProps) {
  const [inputVal, setInputVal] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    setInputVal(value)
    debounceChange(value)
  }

  return (
    <form className={styles.form}>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          type='search'
          placeholder='질환명을 입력해 주세요.'
          ref={inputRef}
          value={inputVal}
          onChange={handleChange}
        />
        <button type='submit'>검색</button>
      </div>
    </form>
  )
}
