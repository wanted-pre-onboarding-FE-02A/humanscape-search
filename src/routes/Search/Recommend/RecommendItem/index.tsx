import HighlightedText from 'components/HighlightedText'

import styles from './RecommendItem.module.scss'
import { SearchIcon } from 'assets/svgs'

interface IData {
  sickCd: string
  sickNm: string
}

interface IProps {
  item: IData
}

export default function RecommendItem({ item }: IProps) {
  return (
    <li>
      <div className={styles.itemCard}>
        <SearchIcon />
        {/* <p>{item.sickNm}</p> */}
        <HighlightedText item={item} />
      </div>
    </li>
  )
}
