import styles from './Loading.module.scss'
import { Suspense } from 'react'
import Recommend from 'components/Recommend'

interface IProps {
  inputVal: string
}

export default function Loading({ inputVal }: IProps) {
  return (
    <div className={styles.recommendWrap}>
      {inputVal !== '' && (
        <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
          <Recommend value={inputVal} />
        </Suspense>
      )}
    </div>
  )
}
