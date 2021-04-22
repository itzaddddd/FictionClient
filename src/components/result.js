import { Card, Col, Row, Space, Typography } from 'antd'
import styled from 'styled-components'
import { getSessionCookie } from '../store/session'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
    ResponsiveContainer,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Radar,
    Legend,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Line 
} from 'recharts'

const { Text } = Typography

const Container = styled(Card)`
    background-color: #eed9fa;
    padding: 0.5em;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 1em;
    border-radius: 1em;
    width: 70%;
`
const RowStyle = styled(Row)`
    margin: 1em;
`

const ChartTopic = styled.div`
    background-color: #8017bd;
    color: white;
    margin: 0 auto;
    padding: 0.2em;
    border-radius: 0.5em;
    font-size: 1.5em;
    width: 30%;
    text-align: center;
`

const CardHeader = styled(Card)`
    text-align: center;
    font-size: 1.8vw;
    border-radius: 0.3em;
    background-color: #8017bd;
    color: white;
`
const CardChart = styled(Card)`
    height: 500px;
    border-radius: 1em;
`

const Chapter = styled(Text)`
    color: white;
    font-size: 1vw;
`

const RadarChartStyle = styled(RadarChart)`
    margin: 0 auto;
`

const LineChartStyle = styled(LineChart)`
    margin: 0 auto;
    margin-top: 2em;
`
const data = [
    {
      "type": "รัก",
      "A": 30,
      "B": 100,
      "fullMark": 100
    },
    {
      "type": "ดราม่า",
      "A": 88,
      "B": 60,
      "fullMark": 100
    },
    {
      "type": "ระทึกขวัญ",
      "A": 76,
      "B": 90,
      "fullMark": 100
    },
    {
      "type": "สืบสวน",
      "A": 50,
      "B": 80,
      "fullMark": 100
    },
    {
      "type": "แอคชัน",
      "A": 20,
      "B": 90,
      "fullMark": 100
    },
    {
      "type": "แฟนตาซี",
      "A": 0,
      "B": 85,
      "fullMark": 100
    }
  ]

  const data2 = [
    {
      "name": "1",
      "drama": 30,
      "thriller": 50,
      "amt": 2400
    },
    {
      "name": "2",
      "drama": 40,
      "thriller": 60,
      "amt": 2210
    },
    {
      "name": "3",
      "drama": 50,
      "thriller": 60,
      "amt": 2290
    },
    {
      "name": "4",
      "drama": 30,
      "thriller": 60,
      "amt": 2000
    },
    {
      "name": "5",
      "drama": 70,
      "thriller": 50,
      "amt": 2181
    },
    {
      "name": "6",
      "drama": 80,
      "thriller": 40,
      "amt": 2500
    },
    {
      "name": "7",
      "drama": 60,
      "thriller": 35,
      "amt": 2100
    },
    {
        "name": "8",
        "drama": 30,
        "thriller": 10,
        "amt": 2400
    },
      {
        "name": "9",
        "drama": 20,
        "thriller": 70,
        "amt": 2210
      },
      {
        "name": "10",
        "drama": 33,
        "thriller": 75,
        "amt": 2290
      },
      {
        "name": "11",
        "drama": 45,
        "thriller": 82,
        "amt": 2000
      },
      {
        "name": "12",
        "drama": 50,
        "thriller": 88,
        "amt": 2181
      },
      {
        "name": "13",
        "drama": 30,
        "thriller": 100,
        "amt": 2500
      },
      {
        "name": "14",
        "drama": 80,
        "thriller": 22,
        "amt": 2100
      }
  ]

const CustomizedLabel = props => {
  const {x,y,value} = props
  return (
    <text
      x={x}
      y={y}
      fontSize='1em'
      fill='#086AFC'
    >
      {value}
    </text>
  )
}
export function Result() {
    const [chapter, setChapter] = useState(JSON.parse(getSessionCookie('content')))
    const [name, setName] = useState(JSON.parse(getSessionCookie('name')))
    const [result, setResult] = useState(JSON.parse(getSessionCookie('result')))

    return(
        <Container>
            <RowStyle>
                <Col flex={12}>
                    <CardHeader>
                        {name ? name : null} <Chapter>({chapter ? JSON.parse(chapter).length : 0} ตอน)</Chapter>
                        <Chapter>{result ? `(Test : ${parseFloat(JSON.parse(result)).toFixed(2)})` : ''}</Chapter>
                    </CardHeader>
                </Col>
            </RowStyle>
            <RowStyle justify='center'>
            { JSON.parse(chapter) ?
                <>
                <Col flex={4}>
                    <CardChart>
                        <ChartTopic>
                            ภาพรวม
                        </ChartTopic>
                        <RadarChartStyle 
                            width={450} 
                            height={400} 
                            data={data} 
                            startAngle={60} 
                            endAngle={-300}
                        >
                            <PolarGrid
                              stroke={'#eed9fa'}
                              strokeWidth={1.5}
                            />
                            <PolarAngleAxis
                                dataKey="type"
                                tick={{fill: '#8017bd', fontSize: '1.4em'}}
                            /> 
                            <PolarRadiusAxis 
                                angle={90} 
                                domain={[0, 100]} 
                                orientation="middle" 
                                tickCount={6} 
                                tick={{fill: '#DB51EB', margin: '1em', fontSize: '0.8em'}}
                                axisLine={false}
                                dy={5}
                            />
                            <Radar 
                                name='Score' 
                                dataKey='A' 
                                stroke='#FFE91B'
                                strokeWidth={3} 
                                fill='#FFE91B' 
                                fillOpacity={0.3} 
                                label={<CustomizedLabel />} 
                            />
                            
                        </RadarChartStyle>

                    </CardChart>
                </Col>
                <Col flex={8}>
                    <CardChart>
                        <ChartTopic>
                            การดำเนินเรื่อง
                        </ChartTopic>
                        <LineChartStyle width={800} height={400} data={data2}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="name" 
                                domain={[1,'auto']} 
                                label='ตอนที่' 
                            />
                            <YAxis 
                                domain={[0,100]}
                                label={{value: 'ตรงหมวดหมู่', angle:-90, position: 'insideLeft'}}
                                unit={'%'}
                                tickCount={11}
                            />
                            <Tooltip />
                            <Legend />
                            <Line  type="monotone" dataKey="drama" stroke="#8884d8" />
                            <Line  type="monotone" dataKey="thriller" stroke="#82ca9d" />
                        </LineChartStyle>
                    </CardChart>
                </Col>
                </>
                :
                <Col flex={12}>
                    <Link to='/add'>
                        <ChartTopic>กรุณาเพิ่มตอนอย่างน้อย 1 ตอนเพื่อแสดงผลลัพธ์</ChartTopic>
                    </Link>
                </Col>
            }
            </RowStyle>
        </Container>
    
    )
}