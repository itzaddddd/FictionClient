import styled from 'styled-components'
import { Card, Typography, Button, Collapse, Modal, Upload, Space, Spin } from 'antd'
import { FileAddOutlined, FolderAddOutlined, MessageOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { setSessionCookie, getSessionCookie} from '../store/session'
import { FIC_DOMAIN } from '../constants'
import { InputChapter } from '../components/modal/inputChapter'
import Axios from 'axios'

const { Title, Text } = Typography
const { Panel } = Collapse

const TitleStyle = styled(Title)`
    text-align: center;
    color: white;
`

const Topic = styled(Card)`
    background-color: var(--color-topic-main);
    padding: 0.5em;
    margin: 0 auto;
    margin-top: 2%;
    margin-bottom: 1em;
    border-radius: 1em;
    width: 50%;
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
const ButtonGroupStyle = styled(Card)`
    width: 15%;
    border-radius: 1em;
    margin: 0 auto;
    margin-top: 5em;
    padding: 1em;
    background-color: var(--color-bg-base);
`
const ButtonControlStyle = styled(Card)`
    margin: 0 auto;
    width: 20%;
    border-color: white;
`

const ButtonInput = styled(Button)`
    border-radius: 0.5em;
    display: inline-block;
    height: 2.4em;
    width: 12em;
    &.ant-btn{
        background-color: var(--color-new-chap);
        border-color: var(--color-new-chap);
        color: white;
        font-size: 0.9vw;
    }
    &.ant-btn:hover{
        background-color: var(--color-menu-bg-main);
        border-color: var(--color-menu-bg-main);
    }
`

const ButtonUpload = styled(Button)`
    border-radius: 0.5em;
    display: inline-block;
    height: 2em;
    width: 8em;
    &.ant-btn{
        font-size: 0.8vw;
        background-color: white;
        border-color: var(--color-topic-main);
        color: var(--color-topic-main);
    }
    &.ant-btn:hover{
        border-color: var(--color-menu-bg-sec);
        color: var(--color-menu-bg-sec);
    }
    &.ant-btn-primary{
        background-color: var(--color-topic-main);
        border-color: var(--color-topic-main);
        color: white;
        font-size: 0.8vw;
    }
    &.ant-btn-primary:hover{
        background-color: var(--color-menu-bg-sec);
        border-color: var(--color-menu-bg-sec);
        color: white;
        font-size: 0.8vw;
    }
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

const ConditionStyle = styled(Card)`
    margin: 0 auto;
    width: 30%;
    text-align: center;
    border-color: white;
    border-radius: 0.5em;
    background-color: var(--color-bg-base);
    font-size: 1.2em;
`
export function AddChapter(){
    const [isSubmit, setIsSubmit] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [content, setContent] = useState(JSON.parse(getSessionCookie('content')))
    const [hasContent, setHasContent] = useState(false)
    const [value, setValue] = useState('')
    const [fileList, setFileList] = useState([])
    const [folder, setFolder] = useState([])
    const history = useHistory()

    useEffect(()=>{
        if(isSubmit){
            setTimeout(()=>{
                setIsLoading(false)
                clearFileList()
                setValue('')
                onAddSuccess()
            },3000)
        }
    },[isSubmit])
    useEffect(async () => {
        if(content){
            setHasContent(true)
        } 
    },[content])
    useEffect(() => {
        if(fileList.length > 0 || folder.length > 0){
            saveTextValue(value)
        }
    },[value])

    const predictGenre = async value => {
        const data = {
            content: value
        }
        const headers = {
            'Content-Type': 'application/json;charset=UTF-8',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Headers':'*',
            'Access-Control-Allow-Methods':'*',
        }
        await Axios({
            method: 'POST',
            url: `${FIC_DOMAIN}/predict`,
            data: data,
            headers: headers
        }) 
        .then(async res => {
            const result = await res.data
            const currentResult = JSON.parse(getSessionCookie('result'))
            let resultArray = []
            if(currentResult){
                resultArray = JSON.parse(currentResult)
                const newResult = {
                    index: resultArray.length+1,
                    result: result
                }
                resultArray.push(newResult)
            }else{
                const newResult = {
                    index: 1,
                    result: result
                }
                resultArray.push(newResult)
            }
            const resultArrayStr = JSON.stringify(resultArray)
            setSessionCookie('result', resultArrayStr)
            .then(res => {

            })
            .catch(err => {
                alert(err)
            })
        })
        .catch( err => {
            alert(err)
        })

    }

    const onAddSuccess = () => {
        Modal.success({
            content: 'เพิ่มตอนใหม่สำเร็จ',
            okText: 'แสดงผลลัพธ์',
            cancelText: 'ยกเลิก',
            className:'modal-upload',
            onOk: ()=>{
                setIsSubmit(false)
                history.push('/result')
            },
            onCancel: ()=>{
                setIsSubmit(false)
            }
        })
    }

    const onAddError = () => {
        Modal.error({
            content: 'เพิ่มตอนใหม่ไม่สำเร็จ'
        })
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleFileListChange = info => {
        let fileList = [...info.fileList]
        setFileList(fileList)
    }
    
    const handleFolderChange = info => {
        let fileList = [...info.fileList]
        fileList.sort((fileA, fileB) => sortByFileName(fileA.name, fileB.name))
        setFolder(fileList)
    }

    const sortByFileName = (fileA, fileB) => (Number(fileA.match(/(\d+)/g)[0]) - Number((fileB.match(/(\d+)/g)[0])))

    const uploadFileList = async () => {
        setIsLoading(true)
        if(fileList.length > 0){
            for(let i in fileList){
                await readChapterFile(fileList[i])
                .then(async res => {
                    setValue(res)
                    await predictGenre(res)
                })
                .catch(err => alert(err))
            }
        }
        if(folder.length > 0){
            for(let i in folder){
                await readChapterFile(folder[i])
                .then(async res => {
                    setValue(res)
                    await predictGenre(res)
                })
                .catch(err => alert(err))
            }
        }
        setIsSubmit(true)
    }

    const clearFileList = () => {
        setFileList([])
        setFolder([])
    }

    const readChapterFile = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsText(file.originFileObj,"UTF-8")
            reader.onload = () => resolve(reader.result)
            reader.onerror = error => reject(error)
        })
    }

    const saveTextValue = async () => {
        const currentData = JSON.parse(getSessionCookie('content'))
        let dataArray = []
        if(currentData){
            dataArray = JSON.parse(currentData)
            const newData = {
                index: dataArray.length+1,
                text: value
            }
            dataArray.push(newData)
        }else{
            const newData = {
                index: 1,
                text: value
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
        .catch(err => alert('Error: ',err))
    }

    return(
        <>
        <SpinStyle spinning={isLoading} tip="กำลังอัพโหลด..." size="large">
            <Topic>
                <TitleStyle style={{color:'white'}}>เพิ่มตอน</TitleStyle>
            </Topic>
            <ConditionStyle>ในแต่ละตอนต้องมีความยาวอย่างน้อย 1000 ตัวอักษร และจำนวนตอนไม่ควรเกิน 100 ตอน</ConditionStyle>
            <ButtonGroupStyle>
                <Space size={30} direction="vertical" style={{width: '100%'}} align="center">
                    <ButtonInput icon={<MessageOutlined />} onClick={showModal}>เพิ่มด้วยข้อความ</ButtonInput>
                    <Upload 
                        fileList={fileList} 
                        onChange={handleFileListChange}
                        multiple
                        beforeUpload={()=>false}
                    >
                        <ButtonInput icon={<FileAddOutlined />}>อัพโหลดไฟล์</ButtonInput>
                    </Upload>
                    <Upload 
                        directory
                        fileList={folder}
                        onChange={handleFolderChange}
                        beforeUpload={()=>false}
                    >
                        <ButtonInput icon={<FolderAddOutlined />}>อัพโหลดโฟลเดอร์</ButtonInput>
                    </Upload>
                </Space>
            </ButtonGroupStyle>
            { fileList.length > 0 || folder.length > 0 ?
            <ButtonControlStyle>
                <Space direction="vertical" style={{width: '100%'}} align="center">
                    <ButtonUpload onClick={clearFileList}>
                        ยกเลิก
                    </ButtonUpload>
                    <ButtonUpload type='primary' onClick={uploadFileList}>
                        อัพโหลด
                    </ButtonUpload>
                </Space>
            </ButtonControlStyle>
            :
            null
            }
            <InputChapter 
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                value={value}
                setValue={setValue}
                content={content}
                setContent={setContent}
                isSubmit={isSubmit}
                setIsSubmit={setIsSubmit}
                predictGenre={predictGenre}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
            />
            { hasContent ?
            <Card style={{borderColor:'white'}}>
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
        </SpinStyle>    
        </>
    )
}