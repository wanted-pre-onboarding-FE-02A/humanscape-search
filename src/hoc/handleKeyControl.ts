import { useRecoilState, useRecoilValue } from 'recoil'
import { dataLengthAtom, focusedIdxAtom } from 'recoil/diseaseInfo'

export const useHandleKeyControl = (e: React.KeyboardEvent) => {
  const length = useRecoilValue(dataLengthAtom)
  const [focusedIdx, setFocusedIdx] = useRecoilState(focusedIdxAtom)

  switch (e.key) {
    case 'ArrowDown':
      if (focusedIdx >= length - 1) {
        setFocusedIdx(0)
        return
      }
      setFocusedIdx(focusedIdx + 1)
      break
    case 'ArrowUp':
      if (focusedIdx <= 0) {
        setFocusedIdx(length - 1)
        return
      }
      setFocusedIdx(focusedIdx - 1)
      break
  }
}
