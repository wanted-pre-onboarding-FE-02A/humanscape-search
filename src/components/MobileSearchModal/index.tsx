import ComponentSearch from 'components/ComponentSearch'
import styles from './MobileSearchModal.module.scss'
import { ChangeEvent } from 'react'
import Loading from 'components/Loading'

interface IProps {
  handleClick: () => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function MobileSearchModal({ handleClick, handleChange }: IProps) {
  const handleClose = () => {
    handleClick()
  }

  return (
    <div className={styles.mobileSearch}>
      <div className={styles.searchWrap}>
        <button type='button' onClick={handleClose}>
          &larr;
        </button>
        <ComponentSearch handleChange={handleChange} />
      </div>
      <Loading />
    </div>
  )
}
