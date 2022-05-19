import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, useEffect, useRef } from 'react'
import styles from './Search.module.scss'

interface IProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Search({ handleChange }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

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
