import HighlightedText from 'components/HighlightedText'

import styles from './RecommendItem.module.scss'
import { SearchIcon } from 'assets/svgs'

interface IData {
  sickCd: string
  sickNm: string
}

interface IProps {
  item: IData
  value: string
}

export default function RecommendItem({ item, value }: IProps) {
  return (
    <li>
      <div className={styles.itemCard}>
        <SearchIcon />
        {/* <p>{item.sickNm}</p> */}
        <HighlightedText item={item} highlight={value} />
      </div>
    </li>
  )
}
