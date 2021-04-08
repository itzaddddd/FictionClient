import { Card, Typography, Space, Col, Row, Image } from 'antd'
import { Radar, Line } from '@ant-design/charts'
import styled from 'styled-components'

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
    height: 200px;
`
const CardChart = styled(Card)`
    height: 500px;
`

const leftBorderRadiusStyle = {
    borderTopLeftRadius: '1em', 
    borderBottomLeftRadius: '1em'
}

const rightBorderRadiusStyle = {
    borderTopRightRadius: '1em', 
    borderBottomRightRadius: '1em'
}

const RadarStyle = styled(Radar)`
    border-radius: 1em;
    width: 400px;
    margin: 0 auto;
    margin-top: 3em;
    
`

const radarData = [
    {name: 'รัก', star: 30},
    {name: 'ดราม่า', star: 50},
    {name: 'ระทึกขวัญ', star: 70},
    {name: 'สืบสวน', star: 60},
    {name: 'แอคชัน', star: 10},
    {name: 'แฟนตาซี', star: 5},
]

const lineData = [
    {chapter: 1, score: 2, type: 'ดราม่า'},
    {chapter: 2, score: 10, type: 'ดราม่า'},
    {chapter: 3, score: 20, type: 'ดราม่า'},
    {chapter: 4, score: 50, type: 'ดราม่า'},
    {chapter: 5, score: 60, type: 'ดราม่า'},
    {chapter: 1, score: 80, type: 'รัก'},
    {chapter: 2, score: 70, type: 'รัก'},
    {chapter: 3, score: 60, type: 'รัก'},
    {chapter: 4, score: 50, type: 'รัก'},
    {chapter: 5, score: 10, type: 'รัก'},
    {chapter: 1, score: 10, type: 'แฟนตาซี'},
    {chapter: 2, score: 10, type: 'แฟนตาซี'},
    {chapter: 3, score: 40, type: 'แฟนตาซี'},
    {chapter: 4, score: 20, type: 'แฟนตาซี'},
    {chapter: 5, score: 10, type: 'แฟนตาซี'},
] 

const radarConfig = {
    data: radarData,
    xField: 'name',
    yField: 'star',
    meta: {
        star: {
            alias: 'Percentage',
            min: 0,
            max: 100
        }
    },
    width: 300,
    height: 300,
    lineStyle: {
        fill: '#FAFF02',
        fillOpacity: 0.4,
        stroke: '#F4F841',
        lineWidth: 5,
        
    },
    point: {
        size: 5,
        color: 'orange'
    },
    xAxis: {
        line: null
    },
    yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        tickCount: 5,
        grid: {
            alternateColor: ['#eed9fa','white'],
            line: {
                type: 'line',
                style: {
                    lineDash: null
                }
            }
        }
    }
} 

const lineConfig = {
    data: lineData,
    xField: 'chapter',
    yField: 'score',
    seriesField: 'type',
    color: ['red','yellow','green'],
    width: 600,
    height: 300,
    xAxis: {
        line: null,
        tickLine: null
    },
    yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
    }
}
export function Result() {
    return(
        <Container>
            <RowStyle>
                <Col flex={1}>
                    <CardHeader
                        style={{...leftBorderRadiusStyle}}
                    >
                        Cover
                    </CardHeader>
                </Col>
                <Col flex={7}>
                    <CardHeader
                        style={{...rightBorderRadiusStyle}}
                    >
                        Detail
                    </CardHeader>
                </Col>
            </RowStyle>
            <RowStyle justify='center'>
                <Col flex={1}>
                    <CardChart
                        style={{...leftBorderRadiusStyle}}
                    >
                        <ChartTopic>
                            Overview
                        </ChartTopic>
                        <RadarStyle {...radarConfig} />
                    </CardChart>
                </Col>
                <Col flex={1}>
                    <CardChart
                        style={{...rightBorderRadiusStyle}}
                    >
                        <ChartTopic>
                            Story Line
                        </ChartTopic>
                        <Line {...lineConfig} />
                    </CardChart>
                </Col>
            </RowStyle>
        </Container>
    
    )
}