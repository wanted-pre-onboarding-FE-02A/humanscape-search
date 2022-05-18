import { ChangeEvent, useEffect, useRef } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'

interface IProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <form className={styles.form}>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input type='search' placeholder='질환명을 입력해 주세요.' ref={inputRef} onChange={handleChange} />
        <button type='submit'>검색</button>
      </div>
    </form>
  )
}
