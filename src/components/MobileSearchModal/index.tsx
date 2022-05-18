import ComponentSearch from 'components/ComponentSearch'
import styles from './MobileSearchModal.module.scss'
import { ChangeEvent } from 'react'
import Loading from 'components/Loading'

interface IProps {
  inputVal: string
  handleClose: () => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function MobileSearchModal({ inputVal, handleClose, handleChange }: IProps) {
  const handleSubmit = (e: any) => {
    handleClose()
  }

  return (
    <div className={styles.mobileSearch}>
      <div className={styles.searchWrap}>
        <button type='button' onClick={handleSubmit}>
          X
        </button>
        <ComponentSearch handleChange={handleChange} />
      </div>
      <Loading inputVal={inputVal} />
    </div>
  )
}
