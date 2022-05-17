import styles from './Humanscape.module.scss'

import { SearchIcon } from 'assets/svgs'
import { ChangeEvent, useEffect, useState } from 'react'

interface IData {
  sickCd: string
  sickNm: string
}

interface ItemCardProps {
  item: IData
  setText: (_: string) => void
  index: number
  focusedIdx: number
  setFocusedIdx: (_: number) => void
}

const ItemCard = ({ item, setText, index, setFocusedIdx, focusedIdx }: ItemCardProps) => {
  const [checked, setChecked] = useState(false)

  // 키보드 이동으로 검색창 반영
  useEffect(() => {
    if (focusedIdx === index) {
      setChecked(true)
      setText(item.sickNm)
      setFocusedIdx(index)
    } else setChecked(false)
  }, [focusedIdx, index, setText, item.sickNm, setFocusedIdx])

  // 클릭으로 검색창 반영
  const handleItemChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value)
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

export default ItemCard
