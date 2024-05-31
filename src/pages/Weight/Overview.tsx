import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useWeightStore } from '@/store/useWeightStore.ts'
import { ContentType } from 'recharts/types/component/Tooltip'

function Overview() {
  const weightRecords = useWeightStore(state => state.weightRecords)

  const data = weightRecords.map(record => ({
    name: record.date,
    weight: record.weight
  }))

  const customTooltipCom: ContentType<number, string> = ({ payload, active }) => {
    if (!active) return null
    return (
      <div style={{ backgroundColor: '#f5f5f5', border: '1px solid #ccc', padding: '10px' }}>
        {payload?.map((item, index) => (
          <p key={index} style={{ color: item.color }}>
            {item.value}
          </p>
        ))}
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height="90%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          bottom: 0,
          left: 0,
          right: 40
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#99999966" />
        <XAxis dataKey="name" className="text-xs" stroke="#999999bb" />
        <YAxis className="text-xs" domain={[110, 130]} stroke="#999999bb" />
        <Tooltip content={customTooltipCom} />
        <Line type="monotone" dataKey="weight" stroke="#008b8b" />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Overview
