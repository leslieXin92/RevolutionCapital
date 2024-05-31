import { createStore } from './index.ts'
import { getWeightRecords } from '@/service/weight.ts'

type WeightRecordType = {
  date: string
  weight: number
}

interface WeightState {
  weightRecords: WeightRecordType[]
  setWeightRecords: (records: WeightRecordType[]) => void
  fetchWeightRecords: (month: string) => Promise<void>
}

export const useWeightStore = createStore<WeightState>(
  'weightStore',
  (set) => ({
      weightRecords: [],
      setWeightRecords: (records: WeightRecordType[]) => {
        set({ weightRecords: records })
      },
      fetchWeightRecords: async (month: string) => {
        const { data: weightRecords } = await getWeightRecords(month)
        set({ weightRecords })
      }}),
  {}
)
