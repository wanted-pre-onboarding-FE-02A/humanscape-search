import styles from './Loading.module.scss'
import { Suspense } from 'react'
import Recommend from 'routes/Search/Recommend'

interface IProps {
  inputVal: string
}

export default function Loading({ inputVal }: IProps) {
  return (
    <div>
      {inputVal !== '' && (
        <div className={styles.recommend}>
          <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
            <Recommend value={inputVal} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
