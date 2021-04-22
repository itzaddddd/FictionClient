import styled from 'styled-components'
import { Card, Typography, Form, Input, Button, Collapse, Modal } from 'antd'
import { useState, useEffect } from 'react'
import { setSessionCookie, getSessionCookie} from '../store/session'
import { FIC_DOMAIN } from '../constants'
import Axios from 'axios'

const { Title } = Typography
const { TextArea } = Input
const { Panel } = Collapse

const TitleStyle = styled(Title)`
    text-align: center;
    color: white;
`

const Topic = styled(Card)`
    background-color: #A214CD;
    padding: 0.5em;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 1em;
    border-radius: 1em;
    width: 50%;
`
const FormInputStyle = styled(Form.Item)`
    width: 60%;
    margin: 0 auto;
    &.ant-form-item {
        textArea {
            border-color: #A214CD;
            border-radius: 1em;
            border-width: 0.2em;
        }
    }
`
const FormControlStyle = styled(Form.Item)`
    &.ant-form-item{
        button.ant-btn {
            margin: 0 auto;
            margin-top: 1em;
            display: block;
        }
    }
`

const CollapseStyle = styled(Collapse)`
    width: 60%;
    margin: 0 auto;
    margin-top: 5em;
    margin-bottom: 5em;
    border-radius: 1em;
    
`

const PanelStyle = styled(Panel)`
    font-size: 1.5em;
    color: red;
` 
const text = `
        เดือนห้าหน้าร้อน อาวรณ์หัวใจเจียนบ้า ฟังเสียงเพลงครวญหาจำปา ที่ทิ้งบ้านนาเข้ามาบางกอก
        น้องขออภัย หนีไปแล้วไม่ได้บอก เจ้าจำปาอยากหาทางออก อยู่บ้านนอกมันเบื่อหลังควาย
        มาอยู่เมืองหลวง โดนลวงหัวใจสะบั้น น้องได้เป็นสะใภ้นายพัน เพียงสี่ห้าวันแล้วเขาก็หน่าย
        ซ้ำถูกประณาม หยามตัวเหมือนวัวเหมือนควาย โอ้เดือนหกฝนตกโปรยปราย น้องนอนร้องไห้คิดถึงสุพรรณ
        
    `

const chapterData = [
    {
        index: 1,
        text: text 
    },
    {
        index: 2,
        text: text 
    },
    {
        index: 3,
        text: text 
    },
    {
        index: 4,
        text: text 
    },
    {
        index: 5,
        text: text 
    }
]
export function AddChapter(){
    const [isSubmit, setIsSubmit] = useState(false)
    const [content, setContent] = useState(JSON.parse(getSessionCookie('content')))
    const [hasContent, setHasContent] = useState(false)

    useEffect(()=>{
        if(isSubmit){
            onAddSuccess()        
        }
    },[isSubmit])
    useEffect(() => {
        if(content){
            setHasContent(true)
            Axios({
                method: 'POST',
                url: `${FIC_DOMAIN}/fic`,
                data: {input: parseFloat((JSON.parse(content)[0].text))}
            }) 
            .then( res => {
                const predict = res.data.data
                setSessionCookie('result', predict)
                .then(res => {
                    console.log('Predict Complete')
                })
                .catch(err => {
                    alert(err)
                })
            })
            .catch( err => {
                alert(err)
            })
        }
    },[content])
    const onFinish = values => {
        const currentData = JSON.parse(getSessionCookie('content'))
        let dataArray = []
        if(currentData){
            dataArray = JSON.parse(currentData)
            const newData = {
                index: dataArray.length+1,
                text: values.content
            }
            dataArray.push(newData)
        }else{
            const newData = {
                index: 1,
                text: values.content
            }
            dataArray.push(newData)
        }
        const dataArrayStr = JSON.stringify(dataArray)
        setSessionCookie('content', dataArrayStr)
        .then(async resp => {
            if(resp.isSuccess){
                const content = getSessionCookie('content')
                if(content){
                    const jsonContent = JSON.parse(content)
                    setContent(jsonContent)
                }
            }
        })
        .catch(err => console.log('Error: ',err))
        setIsSubmit(true)
    }

    const onFinishFailed = error => {
        console.log(error)
    }

    const onReset = () => {
        form.resetFields()
    }

    const [form] = Form.useForm() 

    const onAddSuccess = () => {
        Modal.success({
            content: 'เพิ่มตอนใหม่สำเร็จ',
            onOk: ()=>{
                setIsSubmit(false)
                form.resetFields()
            }
        })
    }

    const onAddError = () => {
        Modal.error({
            content: 'เพิ่มตอนใหม่ไม่สำเร็จ'
        })
    }

    return(
        <>
            <Topic>
                <TitleStyle style={{color:'white'}}>เพิ่มตอน</TitleStyle>
            </Topic>
            <Card>
                <Form
                    form={form}
                    name={`add-chapter`}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <FormInputStyle name={'content'}>
                        <TextArea rows={15} style={{fontSize: '0.9vw'}} />
                    </FormInputStyle>
                    <FormControlStyle>
                        <Button htmlType='button' onClick={onReset}>
                            ล้างข้อมูล
                        </Button>
                        <Button 
                            htmlType='submit' 
                            type='primary' 
                            style={{
                                backgroundColor:'#A214CD', 
                                borderColor: '#A214CD',
                                borderRadius: '0.5em'
                            }}>
                            เพิ่มตอน
                        </Button>
                    </FormControlStyle>
                </Form>
            </Card>
            { hasContent ?
            <Card>
                <Topic>
                    <TitleStyle style={{color:'white'}}>ตอนทั้งหมด ({`${JSON.parse(content).length} ตอน`})</TitleStyle>
                </Topic>
                <CollapseStyle defaultActiveKey={['1']}>
                    {JSON.parse(content).map(chapter => (
                        <PanelStyle header={`ตอนที่ ${chapter.index}`} key={`chap${chapter.index}`} >
                            {chapter.text}
                        </PanelStyle>
                    ))}
                </CollapseStyle>
            </Card>
            :
            null
            }
        </>
    )
}