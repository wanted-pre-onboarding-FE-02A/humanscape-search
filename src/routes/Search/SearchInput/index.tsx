import { ChangeEvent, useEffect, useRef } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import { useRecoilState, useRecoilValue } from 'recoil'
import { dataLengthAtom, focusedIdxAtom } from 'recoil/diseaseInfo'

interface IProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleChange }: IProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const length = useRecoilValue(dataLengthAtom)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  const handleKeyControl = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        if (focusedIdx >= length - 1) {
          setFocusedIdx(0)
          return
        }
        setFocusedIdx(focusedIdx + 1)
        break
      case 'ArrowUp':
        if (focusedIdx <= 0) {
          setFocusedIdx(length - 1)
          return
        }
        setFocusedIdx(focusedIdx - 1)
        break
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.searchBox}>
        <SearchIcon />
        <input
          type='search'
          placeholder='질환명을 입력해 주세요.'
          ref={inputRef}
          // value={value}
          onChange={handleChange}
          onKeyDown={handleKeyControl}
        />
        <button type='submit'>검색</button>
      </div>
    </form>
  )
}
