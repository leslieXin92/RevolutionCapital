import { useEffect, useState } from 'react'
import { DayContentProps } from 'react-day-picker'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import Modal from '@/components/Modal'
import { WeightContainer, DayContent } from './index.style.ts'
import { insertWeightRecord, updateWeightRecord } from '@/service/weight.ts'
// import { useNavigate } from 'react-router-dom'
import { useWeightStore } from '@/store/useWeightStore.ts'

function Weight() {
  const [curMonth, setCurMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [curDate, setCurDate] = useState(new Date())
  const [curDateWeight, setCurDateWeight] = useState(0)
  const [curMode, setCurMode] = useState<'insert' | 'update'>('insert')
  const [open, setOpen] = useState(false)

  const weightRecords = useWeightStore(state => state.weightRecords)
  const setWeightRecords = useWeightStore(state => state.setWeightRecords)
  const fetchWeightRecords = useWeightStore(state => state.fetchWeightRecords)

  const { toast } = useToast() // todo - 没有生效
  // const navigator = useNavigate()

  useEffect(() => {
    if (!curMonth) return
    fetchWeightRecords(curMonth)
  }, [curMonth])

  useEffect(() => {
    if (!curDate || !weightRecords?.length) return
    const formatDate = format(curDate, 'yyyy-MM-dd')
    const weight = weightRecords.find(i => i.date === formatDate)?.weight as number | undefined
    setCurDateWeight(weight || 0)
    setCurMode(weight === undefined ? 'insert' : 'update')
  }, [weightRecords, curDate])

  const onSelectDate = (day: Date | undefined) => {
    if (!day) return
    setCurDate(day)
    setOpen(true)
  }

  const onMonthChange = (month: Date) => {
    const formatMonth = format(month, 'yyyy-MM')
    setCurMonth(formatMonth)
  }

  const onModalConfirm = async () => {
    const formatDate = format(curDate, 'yyyy-MM-dd')
    try {
      if (curMode === 'insert') {
        await insertWeightRecord(formatDate, curDateWeight)
        setWeightRecords([...weightRecords, { date: formatDate, weight: curDateWeight }])
      } else {
        await updateWeightRecord(formatDate, curDateWeight)
        setWeightRecords(weightRecords.map(i => ({
          ...i,
          weight: i.date === formatDate ? curDateWeight : i.weight
        })))
      }
      toast({ title: `${curMode.toUpperCase()} Success!` })
      await fetchWeightRecords(curMonth)
      setOpen(false)
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Network Error!',
        description: (e as Error).message
      })
    }
  }

  const customCom = {
    DayContent: ({ date }: DayContentProps) => {
      const curWeightRecord = weightRecords.find(i => i.date === format(date, 'yyyy-MM-dd'))
      const curWeight = curWeightRecord?.weight
      return (
        <DayContent>
          <div className="date">{date.getDate()}</div>
          <div className="weight">{curWeight ? (curWeight as number).toFixed(1) : '-'}</div>
        </DayContent>
      )
    }
  }

  const ModalContent = () => {
    return (
      <Input
        type="number"
        placeholder="weight"
        min={0}
        value={curDateWeight}
        onInput={(e) => setCurDateWeight(Number((e.target as unknown as HTMLInputElement).value))}
      />
    )
  }

  const ModalFooter = () => {
    return <>
      <Button size="sm" onClick={onModalConfirm}>Confirm</Button>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(false)}
      >
        Close
      </Button>
    </>
  }

  return <WeightContainer>
    <Calendar
      className="flex justify-center items-center h-full"
      mode="single"
      selected={curDate}
      onSelect={onSelectDate}
      onMonthChange={onMonthChange}
      showOutsideDays={false}
      components={customCom}
    />

    <Modal
      title={curMode === 'insert' ? 'Insert Record' : 'Update Record'}
      subtitle={curDate && format(curDate, 'yyyy-MM-dd')}
      open={open}
      onOpenChange={setOpen}
      content={ModalContent()}
      footer={ModalFooter()}
    />
  </WeightContainer>
}

export default Weight
