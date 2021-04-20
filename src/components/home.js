import { Card, Typography, Modal } from 'antd'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { NewStoryModal } from './modal/newStory'
import { ResetModal } from './modal/reset'
import { getSessionCookie ,resetSessionCookie, clearSessionCookie } from '../store/session'

const { Title } = Typography
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
const GroupMenu = styled(Card)`
    background-color: #eed9fa;
    border-radius: 1em;
    margin: 0 auto;
    margin-top: 3em;
    padding: 1em;
    width: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-card-body{
        display: flex;
    }
`

const MenuItem = styled(Card)`
    background-color: #A214CD;
    margin: 1em;
    width: 10vw;
    height: 10vw;
    border-radius: 1em;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-card-body {
        text-align: center;
        font-size: 1.5vw;
    }
`

const StoryName = styled(Card)`
    margin: 0 auto;
    margin-top: 1em;
    width: 30%;
    text-align: center;
    font-size: 1.4vw;
    background-color: #eed9fa;
    border-radius: 0.5em;
`
export const Home = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [hasStoryName, setHasStoryName] = useState(false)
    const [storyName, setStoryName] = useState('')
    const [isResetModalVisible, setIsResetModalVisible] = useState(false)
    const history = useHistory()
    const name = JSON.parse(getSessionCookie('name'))

    const showModal = () => {
        setIsModalVisible(true)
    }

    const onNewStorySuccessModal = () => {
        Modal.success({
            title: 'สร้างเรื่องใหม่สำเร็จ',
            content: `เรื่อง : ${storyName}`,
            okText: 'ตกลง'
        })
    }

    const onNewStoryErrorModal = () => {
        Modal.error({
            content: 'เกิดข้อผิดพลาดขณะสร้างเรื่องใหม่',
            okText: 'ตกลง'
        })
    }

    const onResetSuccessModal = () => {
        Modal.success({
            content: 'ล้างข้อมูลสำเร็จ!',
            onOk: () => history.push('/'),
            okText: 'ตกลง'
        })
    }

    const onResetErrorModal = () => {
        Modal.error({
            content: 'เกิดข้อผิดพลาดในการล้างข้อมูล',
            onOk: () => history.push('/'),
            okText: 'ตกลง'
        })
    }

    const onReset = () => {
        clearSessionCookie()
        .then( res => {
            if(res.isClear){
                setStoryName('')
                setHasStoryName(false)
                onResetSuccessModal()
            }else{
                onResetErrorModal()
            }
        })
        .catch( err => {
            alert(err)
        })
    }

    return(
    <>
        <Topic>
            <TitleStyle style={{fontSize:'2.5vw',color: 'white'}}>FICTION GENE</TitleStyle>
        </Topic>
        { name ?
        <StoryName>ชื่อเรื่อง : {name}</StoryName>
        :
        <StoryName>กรุณาเพิ่มเรื่องใหม่</StoryName>
        }
        <GroupMenu>
            { name ?
            <MenuItem style={{backgroundColor:'#d3d3d3', color:'black'}}>
                เพิ่มเรื่องใหม่
            </MenuItem>
            :
            <MenuItem onClick={showModal} style={{backgroundColor:'#4d0e72'}} hoverable>
                เพิ่มเรื่องใหม่
            </MenuItem>
            }
            { name ?
            <MenuItem onClick={()=>history.push('/add')} style={{backgroundColor:'#8017bd'}} hoverable>
                เพิ่มตอน
            </MenuItem>
            :
            <MenuItem style={{backgroundColor:'#d3d3d3',color: 'black'}}>
                เพิ่มตอน
            </MenuItem>
            }
            { name ?
            <MenuItem onClick={()=>history.push('/result')} style={{backgroundColor:'#aa42e8'}} hoverable>
                แสดงผลลัพธ์
            </MenuItem>
            :
            <MenuItem style={{backgroundColor:'#d3d3d3', color:'black'}}>
                แสดงผลลัพธ์
            </MenuItem>
            }
            { name ?
            <MenuItem onClick={setIsResetModalVisible} style={{backgroundColor:'#cc8df1'}} hoverable>
                ล้างข้อมูล
            </MenuItem>
            :
            <MenuItem style={{backgroundColor:'#d3d3d3',color:'black'}}>
                ล้างข้อมูล
            </MenuItem>
            }
        </GroupMenu>
        <NewStoryModal 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            storyName={storyName}
            setStoryName={setStoryName}
            hasStoryName={hasStoryName}
            setHasStoryName={setHasStoryName}
            onSuccess={onNewStorySuccessModal}
            onError={onNewStoryErrorModal}
        />
        <ResetModal 
            isResetModalVisible={isResetModalVisible} 
            setIsResetModalVisible={setIsResetModalVisible} 
            onReset={onReset}
        />
        
    </>
    )
}