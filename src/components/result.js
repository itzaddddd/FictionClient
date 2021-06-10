import { Card, Col, Row, Typography, Spin, Tag } from 'antd'
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
import { ControlOutlined } from '@ant-design/icons'

const { Text } = Typography

const Container = styled(Card)`
    background-color: var(--color-bg-base);
    padding: 0.5em;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 2%;
    border-radius: 1em;
    width: 70%;
`
const RowStyle = styled(Row)`
    margin: 1em;
`

const ChartTopic = styled.div`
    background-color: var(--color-new-chap);
    border-color: var(--color-new-chap);
    color: white;
    margin: 0 auto;
    padding: 0.2em;
    border-radius: 0.5em;
    font-size: 1.5em;
    width: 30%;
    text-align: center;
    :hover{
      background-color: var(--color-menu-bg-main);
    }
`

const CardHeader = styled(Card)`
    text-align: center;
    font-size: 1.8vw;
    border-radius: 0.3em;
    background-color: var(--color-new-chap);
    color: white;
`
const CardChart = styled(Card)`
    height: 550px;
    border-radius: 1em;
    margin: 0.5em;
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

const SpinStyle = styled(Spin)`
    margin-top: 10%;
    .ant-spin-dot-item{
        background-color: var(--color-new-story);
        font-size: 1.5em;
    }
    .ant-spin-text{
        color: var(--color-new-story);
        font-size: 1.5em;
    }
`

const TopGenre = styled(Card)`
    border-color: white;
    text-align: center;
`

const TagStyle = styled(Tag)`
    border-radius: 0.5em;
    font-size: 1em;
    padding: 0.5em;
    width: 7em;
`
 
const CustomizedRadarLabel = props => {
  const {x,y,value} = props
  return (
    <text
      x={x}
      y={y}
      fontSize='1.1em'
      fill='var(--color-chart-label)'
    >
      {value}%
    </text>
  )
}

export function Result() {
    const [name, setName ] = useState(JSON.parse(getSessionCookie('name')))
    const [content, setContent] = useState(JSON.parse(JSON.parse(getSessionCookie('content'))))
    const [result, setResult ] = useState(JSON.parse(JSON.parse(getSessionCookie('result'))))
    const [isLoading, setIsLoading] = useState(false)
    const [probData, setProbData] = useState([])
    const [topGenre, setTopGenre] = useState([])
    const [probMap, setProbMap] = useState([])
    const [lineMap, setLineMap] = useState([
      {
        genre: 'action',
        color: '#EBB814',
        genreTH: 'แอคชัน'
      },
      {
        genre: 'detective',
        color: '#14C143',
        genreTH: 'สืบสวน'
      },
      {
        genre: 'drama',
        color: '#37A4F7',
        genreTH: 'ดราม่า'
      },
      {
        genre: 'fantasy',
        color: '#4025EF',
        genreTH: 'แฟนตาซี'
      },
      {
        genre: 'romantic',
        color: '#EC21D8',
        genreTH: 'โรแมนติก'
      },
      {
        genre: 'thriller',
        color: '#D70000',
        genreTH: 'ระทึกขวัญ'
      },
    ])

    useEffect(() => {
      if(content) setIsLoading(true)
    },[content])
    useEffect(() => {
      if(result){
        setIsLoading(false)
        setProbData(getProbData())
        const probMap = result.map(chap => {
          let map = {}
          chap.result.forEach(res => {
            map[res.genre] = parseInt(res.prob * 100)
          })
          return {
            name: chap.index,
            ...map
          }
        })
        setProbMap(probMap)
      } 
    },[result])

    useEffect(() => {
      if(probData.length > 0){
        const unsortedProbData = [...probData]
        const sortedProbData = [
          ...unsortedProbData.sort((genreA, genreB) => genreB.prob - genreA.prob)
        ] 
        const topGenre = getTopGenre(sortedProbData)
        setTopGenre(topGenre)
      }
    },[probData])
    const getProbData = () => {
      const probSum = {
        'action':0,
        'detective':0,
        'drama':0,
        'fantasy':0,
        'romantic':0,
        'thriller':0
      }
      const probData = []
      for(let i in result){
        let probArr = result[parseInt(i)].result
        probArr.forEach(arr => probSum[arr['genre']] += arr['prob']/result.length)
      }
      for(let genre in probSum){
        probSum[genre] = parseInt(probSum[genre]*100)
        const probGenre = {
          'genre': genre,
          'prob': probSum[genre]
        }
        probData.push(probGenre)
      }
      return probData
    }

    const getTopGenre = sortedGenreArr => {
      let sum = 0
      let topGenre = []
      sortedGenreArr.every(data => {
        topGenre.push(data.genre)
        sum += data.prob
        if(sum > 50) return false 
        return true
      })
      return topGenre
    }
    
    return(
      <SpinStyle spinning={isLoading} tip="กำลังประมวลผล..." size="large">
        <Container>
            <RowStyle>
                <Col flex={12}>
                    <CardHeader>
                        {name ? name : null} <Chapter>({content ? content.length : 0} ตอน)</Chapter>
                    </CardHeader>
                </Col>
            </RowStyle>
            <RowStyle justify='center'>
            { content ?
                <>
                <Col flex={8}>
                    <CardChart>
                        <ChartTopic>
                            ภาพรวม
                        </ChartTopic>
                        <TopGenre>
                          {topGenre.map((genre,index) => {
                            const sub = lineMap.find(line => line.genre === genre)
                            let tag = ''
                            {index === 0 ?
                              tag =  
                              <TagStyle 
                                key={genre} 
                                color={sub.color} 
                                style={{fontSize:'1.3em'}}
                              >
                                {sub.genreTH}
                              </TagStyle>
                              :
                              tag =
                              <TagStyle 
                                key={genre} 
                                color={sub.color} 
                                style={{opacity:0.7}}
                              >
                                {sub.genreTH}
                              </TagStyle>
                            }
                            return tag
                          })}
                        </TopGenre>
                        { probData.length > 0 ?
                        <ResponsiveContainer width={'96%'} height={400} >
                        <RadarChartStyle 
                            width={400} 
                            height={400} 
                            data={probData} 
                            startAngle={60} 
                            endAngle={-300}
                        >
                            <PolarGrid
                              stroke={'var(--color-bg-base)'}
                              strokeWidth={1.5}
                            />
                            <PolarAngleAxis
                                dataKey="genre"
                                tick={{fill: 'var(--color-new-chap)', fontSize: '1.1vh'}}
                                tickFormatter={tickItem => {
                                  const sub = lineMap.find(line => line.genre === tickItem )
                                  return sub.genreTH
                                }}
                                dx={1}
                            /> 
                            <PolarRadiusAxis 
                                angle={90} 
                                // domain={[0, 100]} 
                                orientation="middle" 
                                // tickCount={6} 
                                tick={{fill: 'var(--color-y-label)', margin: '1em', fontSize: '0.9em'}}
                                axisLine={false}
                                dy={5}
                                tickFormatter={tickItem => `${tickItem}%`}
                            />
                            <Radar 
                                name='Score' 
                                dataKey='prob' 
                                stroke='var(--color-radar)'
                                strokeWidth={3} 
                                fill='var(--color-radar)'
                                fillOpacity={0.3} 
                                isAnimationActive={false}
                                label={<CustomizedRadarLabel />} 
                            />
                        </RadarChartStyle>
                        </ResponsiveContainer>
                        :
                        null
                        } 
                    </CardChart>
                </Col>
                <Col flex={16}>
                    <CardChart>
                        <ChartTopic>
                            การดำเนินเรื่อง
                        </ChartTopic>
                        <ResponsiveContainer width={"95%"} height={400}>
                        <LineChartStyle width={800} height={400} data={probMap}>
                            <CartesianGrid strokeDasharray="2 2" />
                            <XAxis 
                                dataKey="name" 
                                domain={[1,'auto']} 
                                label={{value:"ตอนที่",dy:15}}
                                dy={5}
                            />
                            <YAxis 
                                //domain={[0,100]}
                                label={{value: 'ตรงหมวดหมู่', angle:-90, position: 'insideLeft'}}
                                unit={'%'}
                                //tickCount={11}
                            />
                            <Tooltip />
                            <Legend
                              layout="horizontal"
                              verticalAlign="top"
                              align="center"
                            />
                            {lineMap.map(line => 
                            <Line
                              key={line.genre}  
                              type="monotone"
                              dot={false}
                              dataKey={line.genre}
                              name={line.genreTH} 
                              stroke={line.color}
                              isAnimationActive={false}
                              opacity={topGenre.includes(line.genre)?1:0.2}
                            />)}
                        </LineChartStyle>
                        </ResponsiveContainer>
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
      </SpinStyle>  
    )
}