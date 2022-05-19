import styles from './Loading.module.scss'
import { Suspense } from 'react'
import Recommend from 'components/Recommend'
import { useRecoilValue } from 'recoil'
import { inputValue } from 'recoil/diseaseInfo'

export default function Loading() {
  const inputVal = useRecoilValue(inputValue)

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
