import { Suspense } from 'react'
import styles from './RecommendWrap.module.scss'

import Recommend from './Recommend'

interface IProps {
  value: string
}

export default function RecommendWrap({ value }: IProps) {
  if (value === '') return null
  return (
    <div className={styles.wrapper}>
      <Suspense fallback={<div className={styles.loading}>검색 중...</div>}>
        <Recommend value={value} />
      </Suspense>
    </div>
  )
}
