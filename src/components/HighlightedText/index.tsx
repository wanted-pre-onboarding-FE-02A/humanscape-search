import { ReactFragment, useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import { inputValueAtom } from '../../recoil/diseaseInfo'

interface HighlightedTextProps {
  item: IData
}

interface IData {
  sickCd: string
  sickNm: string
}

function HighlightedText({ item }: HighlightedTextProps) {
  const highlight = useRecoilValue(inputValueAtom)

  const regex = useMemo(() => {
    return new RegExp(`(${highlight})`, 'gi')
  }, [highlight])

  const parts = item.sickNm.split(regex)

  const renderText = useCallback(
    (arr: string[]): ReactFragment => {
      return arr.filter(String).map((part, i) => {
        const key = `splitedText-${i}`
        return regex.test(part) ? <mark key={key}>{part}</mark> : <span key={key}>{part}</span>
      })
    },
    [regex]
  )

  return <span>{renderText(parts)}</span>
}

export default HighlightedText
