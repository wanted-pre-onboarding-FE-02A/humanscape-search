import Search from 'components/Search'
import styles from './MobileSearchModal.module.scss'
import { ChangeEvent } from 'react'

interface IProps {
  handleClose: () => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function MobileSearchModal({ handleClose, handleChange }: IProps) {
  const handleSubmit = (e: any) => {
    handleClose()
  }

  return (
    <div className={styles.mobileSearch}>
      <div className={styles.searchWrap}>
        <button type='button' onClick={handleSubmit}>
          X
        </button>
        <Search handleChange={handleChange} />
      </div>
    </div>
  )
}
