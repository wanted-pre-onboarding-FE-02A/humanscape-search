import { ChangeEvent, Suspense, useMemo, useState, useRef } from 'react'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Setting from 'components/Setting/indes'
import _ from 'lodash'
import { useSetRecoilState } from 'recoil'
import MobileSearchModal from 'components/MobileSearchModal'
import Modal from 'components/Modal'
import useOnClickOutside from 'hooks/useOnClickOutside'
import { inputValue } from 'recoil/diseaseInfo'

// const pattern = /^[가-힣a-zA-Z0-9]+$/
// if (pattern.test(value) && value.length !== 0) {
// }
export default function Search() {
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false)
  const setInputVal = useSetRecoilState(inputValue)
  const ref = useRef(null)

  const pattern = /^[가-힣a-zA-Z0-9]+$/

  useOnClickOutside(ref, () => setIsMobileModalOpen(false))
  const handleClick = () => setIsMobileModalOpen((prev) => !prev)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget
    // setInputVal(value)
    if (pattern.test(value)) {
      debounceSetInput(value)
    }
  }
  const debounceSetInput = useMemo(() => _.debounce(setInputVal, 1000), [])

  return (
    <>
      <Setting />
      <SearchInput handleClick={handleClick} handleChange={handleChange} />
      {isMobileModalOpen && (
        <Modal>
          <MobileSearchModal handleClick={handleClick} handleChange={handleChange} />
        </Modal>
      )}
    </>
  )
}
