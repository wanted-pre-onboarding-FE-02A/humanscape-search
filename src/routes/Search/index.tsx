import { FormEvent } from 'react'
import styles from './Search.module.scss'

import SearchInput from './SearchInput'
import Setting from 'components/Setting/indes'
import _ from 'lodash'

export default function Search() {
  const handleSubmit = (value: string) => (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('submit', value)
  }

  return (
    <>
      <Setting />
      <SearchInput handleSubmit={handleSubmit} />
    </>
  )
}
