import { ReactFragment, useCallback, useMemo } from 'react'

interface HighlightedTextProps {
  item: IData
  highlight: string
}

interface IData {
  sickCd: string
  sickNm: string
}

function HighlightedText({ item, highlight }: HighlightedTextProps) {
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
