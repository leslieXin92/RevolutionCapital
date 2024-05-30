import { create } from 'zustand'
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

export const useWeightStore = create<WeightState>(set => ({
  weightRecords: [],
  setWeightRecords: (records: WeightRecordType[]) => set(() => ({ weightRecords: records })),
  fetchWeightRecords: async (month: string) => {
    const { data: weightRecords } = await getWeightRecords(month)
    set(() => ({ weightRecords }))
  }
}))
