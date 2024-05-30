import { http } from './http.ts'

export const getWeightRecords = async (month: string) => {
  return await http('/weight', {
    params: {
      month
    }
  })
}

export const insertWeightRecord = async (date: string, weight: number) => {
  return await http('/weight', {
    method: 'post',
    params: { date, weight }
  })
}

export const updateWeightRecord = async (date: string, weight: number) => {
  return await http('/weight', {
    method: 'put',
    params: { date, weight }
  })
}
