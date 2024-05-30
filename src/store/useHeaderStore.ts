import { create } from 'zustand'

interface Header {
  curPathStack: string[]
  setCurPathStack: (path: string[]) => void
}

export const useHeaderStore = create<Header>((set) => ({
  curPathStack: [],
  setCurPathStack: (pathStack: string[]) => set({ curPathStack: pathStack })
}))
