import { create } from 'zustand'
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware'
import { StateCreator } from 'zustand/vanilla'

export const createStore = <T = any, S = any>(
  name: string,
  store: StateCreator<T>,
  options: Omit<PersistOptions<S>, 'name'> = {}
) => {
  return create(persist(store, {
    storage: createJSONStorage(() => sessionStorage),
    ...options,
    name
  } as PersistOptions<T>))
}
