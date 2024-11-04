import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

const data = [
  { name: '周一', sales: 4000 },
  { name: '周二', sales: 3000 },
  { name: '周三', sales: 2000 },
  { name: '周四', sales: 2780 },
  { name: '周五', sales: 1890 },
  { name: '周六', sales: 2390 },
  { name: '周日', sales: 3490 },
]

export const SalesChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>销售趋势</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}