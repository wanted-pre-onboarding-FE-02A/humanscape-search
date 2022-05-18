import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import Modal from 'components/Modal'
// import MobileSearchModal from 'components/MobileSearchModal'
import useOnClickOutside from 'hooks/useOnClickOutside'
import Search from 'components/Search'
import Loading from 'components/Loading'
import _ from 'lodash'
import MobileSearchModal from 'components/MobileSearchModal'

interface IProps {
  // inputVal: string
  // handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (value: string) => (e: FormEvent<HTMLFormElement>) => void
}

export default function SearchInput({ /* inputVal,  handleChange, */ handleSubmit }: IProps) {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)

  const ref = useRef(null)

  useOnClickOutside(ref, () => setIsMobileModalOpen(false))
  const handleClick = () => setIsMobileModalOpen((prev) => !prev)

  const [inputVal, setInputVal] = useState('')
  const pattern = /^[가-힣a-zA-Z0-9]+$/

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    // setInputVal(value)
    if (pattern.test(value)) {
      debounceSetInput(value)
    }
  }
  const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])
  console.log(inputVal)

  return (
    <>
      <form className={styles.form} /* onSubmit={handleSubmit(inputVal)} */>
        <div className={styles.mobileSearchBtn}>
          <button type='button' onClick={handleClick}>
            <p>질환명을 입력해주세요</p>
            <SearchIcon />
          </button>
        </div>
        <div className={styles.searchBox}>
          <Search handleChange={handleChange} />
          <button type='submit'>검색</button>
        </div>
      </form>
      <Loading inputVal={inputVal} />
      {isMobileModalOpen && (
        <Modal>
          <MobileSearchModal handleClose={handleClick} handleChange={handleChange} />
        </Modal>
      )}
    </>
  )
}
