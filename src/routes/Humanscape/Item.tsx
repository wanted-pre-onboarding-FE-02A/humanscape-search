import styles from './Humanscape.module.scss'

import { SearchIcon } from 'assets/svgs'

interface IData {
  sickCd: string
  sickNm: string
}

interface ItemCardProps {
  item: IData
}

const ItemCard = ({ item }: ItemCardProps) => {
  return (
    <li>
      <div className={styles.itemCard}>
        <SearchIcon />
        <p>{item.sickNm}</p>
      </div>
    </li>
  )
}

export default ItemCard
