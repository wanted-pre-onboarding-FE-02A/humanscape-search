import styles from './RecommendItem.module.scss'
import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { focusedIdxAtom } from 'recoil/diseaseInfo'
import _ from 'lodash'

import HighlightedText from '../../../../components/HighlightedText'

interface IData {
  sickCd: string
  sickNm: string
}

interface IProps {
  item: IData
  index: number
  setInputValue: (inputVal: string) => void
}

export default function RecommendItem({ item, index, setInputValue }: IProps) {
  const [checked, setChecked] = useState(false)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)
  // const debounceItemTitle = _.debounce(() => {
  //   setInputVal(item.sickNm)
  // }, 2000)

  // 키보드 이동으로 검색창 반영
  useEffect(() => {
    if (focusedIdx === index) {
      setChecked(true)
      setFocusedIdx(index)
      // setInputVal(item.sickNm)
      // debounceItemTitle()
    } else setChecked(false)
  }, [focusedIdx, index, setInputValue, item.sickNm, setFocusedIdx])

  // 클릭으로 검색창 반영
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setInputVal(e.currentTarget.value)
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
          <HighlightedText item={item} />
        </div>
      </label>
    </li>
  )
}
