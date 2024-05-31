import { createStore } from './index.ts'

interface Header {
  curPathStack: string[]
  setCurPathStack: (path: string[]) => void
}

export const useHeaderStore = createStore<Header>(
  'headerStore',
  (set) => ({
    curPathStack: [],
    setCurPathStack: (pathStack: string[]) => set({ curPathStack: pathStack })
  }),
  {}
)
