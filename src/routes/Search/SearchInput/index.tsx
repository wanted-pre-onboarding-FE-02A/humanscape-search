import { ChangeEvent } from 'react'
import styles from './SearchInput.module.scss'
import { SearchIcon } from 'assets/svgs'
import Search from 'components/ComponentSearch'
import Loading from 'components/Loading'
import { useRecoilValue } from 'recoil'
import { inputValue } from 'recoil/diseaseInfo'

interface IProps {
  handleClick: any
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function SearchInput({ handleClick, handleChange }: IProps) {
  const inputVal = useRecoilValue(inputValue)

  console.log(inputVal)

  return (
    <>
      <form className={styles.form}>
        <div className={styles.mobileSearchBtn}>
          <button type='button' onClick={handleClick}>
            <p>질환명을 입력해주세요</p>
            <SearchIcon />
          </button>
        </div>
        <div className={styles.searchBox}>
          <Search handleChange={handleChange} />
          <button type='submit'>검색</button>
        </div>
      </form>
      <Loading />
    </>
  )
}
