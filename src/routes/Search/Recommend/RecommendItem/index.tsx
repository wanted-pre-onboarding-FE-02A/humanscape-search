import styles from './RecommendItem.module.scss'
import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { focusedIdxAtom } from 'recoil/diseaseInfo'
import _ from 'lodash'

interface IData {
  sickCd: string
  sickNm: string
}

interface IProps {
  item: IData
  index: number
}

export default function RecommendItem({ item, index }: IProps) {
  const [checked, setChecked] = useState(false)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)

  // 키보드 이동으로 검색창 반영
  useEffect(() => {
    console.log(focusedIdx, index)
    if (focusedIdx === index) {
      setChecked(true)
      setFocusedIdx(index)
    } else setChecked(false)
  }, [focusedIdx, index, item.sickNm, setFocusedIdx])

  // 클릭으로 검색창 반영
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFocusedIdx(index)
  }

  return (
    <li>
      <label>
        <input
          type='radio'
          name='autocompletedKeyword'
          value={item.sickNm}
          onChange={handleItemChange}
          checked={checked}
        />
        <div className={styles.itemCard}>
          <SearchIcon />
          <p>{item.sickNm}</p>
        </div>
      </label>
    </li>
  )
}
