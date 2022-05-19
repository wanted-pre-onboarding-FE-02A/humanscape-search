import { ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import { cx } from 'styles'

interface IProps {
  isMoblie: boolean
  debounceChange: _.DebouncedFunc<Dispatch<SetStateAction<string>>>
  handleClick: () => void
}

export default function SearchInput({ isMoblie, debounceChange, handleClick }: IProps) {
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

  console.log(isMoblie)
  return (
    <form className={cx(styles.form, { [styles.mobile]: isMoblie })}>
      <button type='button' onClick={handleClick}>
        모바일버튼
      </button>
      <div className={styles.searchWrap}>
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
      </div>
    </form>
  )
}
