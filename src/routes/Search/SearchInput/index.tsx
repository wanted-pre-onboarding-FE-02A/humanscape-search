import { ChangeEvent, FormEvent, useEffect, useRef } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'

interface IProps {
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (value: string) => (e: FormEvent<HTMLFormElement>) => void
}

export default function SearchInput({ value, handleChange, handleSubmit }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <form className={styles.form} onSubmit={handleSubmit(value)}>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          type='search'
          placeholder='질환명을 입력해 주세요.'
          ref={inputRef}
          // value={value}
          onChange={handleChange}
        />
        <button type='submit'>검색</button>
      </div>
    </form>
  )
}
