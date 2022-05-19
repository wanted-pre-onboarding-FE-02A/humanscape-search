import { atom } from 'recoil'

export const settingAtom = atom({
  key: 'settingAtom',
  default: {
    maxCnt: 10,
    sickType: 1,
    medTp: 2,
  },
})

export const inputValue = atom<string>({
  key: 'inputValue',
  default: '',
})
