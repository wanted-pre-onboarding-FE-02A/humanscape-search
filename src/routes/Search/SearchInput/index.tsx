import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import Modal from 'components/Modal'
import MobileSearchModal from 'components/MobileSearchModal'
import useOnClickOutside from 'hooks/useOnClickOutside'

interface IProps {
  value: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (value: string) => (e: FormEvent<HTMLFormElement>) => void
}

export default function SearchInput({ value, handleChange, handleSubmit }: IProps) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsMobileModalOpen(false))
  const handleClick = () => setIsMobileModalOpen((prev) => !prev)

  useEffect(() => {
    if (!inputRef.current) return
    inputRef.current.focus()
  }, [])

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(value)}>
        <div className={styles.mobileSearchBtn}>
          <button type='button' onClick={handleClick}>
            <p>질환명을 입력해주세요</p>
            <SearchIcon />
          </button>
        </div>
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
      {isMobileModalOpen && (
        <Modal>
          <div ref={ref}>
            <MobileSearchModal handleClose={handleClick} />
          </div>
        </Modal>
      )}
    </>
  )
}
