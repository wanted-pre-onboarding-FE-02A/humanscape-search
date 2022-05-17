import { useMount } from 'react-use'
import { Routes, Route } from 'react-router-dom'
import styles from './Routes.module.scss'

import { useAppSelector } from 'hooks'
import { getTheme } from 'states/system'

// import TodoList from './TodoList'
// import Weather from './Weathers'
import Humanscape from './Humanscape'
import GNB from 'routes/_shared/GNB'

const App = () => {
  const theme = useAppSelector(getTheme)

  useMount(() => {
    document.documentElement.setAttribute('color-theme', theme)
  })

  return (
    <div className={styles.appWrapper}>
      <GNB />
      <div className={styles.app}>
        <Routes>
          <Route path='/' element={<Humanscape />} />
          <Route path='humanscape' element={<Humanscape />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
