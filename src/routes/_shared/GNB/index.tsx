import styles from './GNB.module.scss'

import { useAppDispatch } from 'hooks'
import { toggleTheme } from 'states/system'
import { LogoImage } from 'assets/svgs'

const GNB = () => {
  const dispatch = useAppDispatch()

  const handleThemeClick = () => {
    dispatch(toggleTheme())
  }

  return (
    <nav className={styles.gnb}>
      <ul>
        <LogoImage />
        2-A조
      </ul>
      <div className={styles.rightWing}>
        <button type='button' onClick={handleThemeClick} className={styles.theme}>
          소식받기
        </button>
        <button type='button' className={styles.language}>
          제휴/문의
        </button>
      </div>
    </nav>
  )
}

export default GNB
