import { Card, Typography, Modal } from 'antd'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { NewStoryModal } from './newStory'
import { getSessionCookie ,resetSessionCookie } from '../store/session'

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
export function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [hasStoryName, setHasStoryName] = useState(false)
    const [storyName, setStoryName] = useState('')
    const history = useHistory()
    const session = getSessionCookie()

    const showModal = () => {
        setIsModalVisible(true)
    }

    const onSuccessModal = () => {
        Modal.success({
            content: 'Already Reset Session!',
            onOk: () => {history.push('/')}
        })
    }

    const onErrorModal = () => {
        Modal.error({
            content: 'Reset Session Error'
        })
    }

    const onReset = () => {
        resetSessionCookie()
        .then( res => {
            if(res.isReset){
                onSuccessModal()
            }else{
                onErrorModal()
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
        { session.name ?
        <StoryName>Story Name : {session.name}</StoryName>
        :
        <StoryName>Please add new story</StoryName>
        }
        <GroupMenu>
            { session.name ?
            <MenuItem style={{backgroundColor:'#d3d3d3', color:'black'}}>
                New Story
            </MenuItem>
            :
            <MenuItem onClick={showModal} style={{backgroundColor:'#4d0e72'}} hoverable>
                New Story
            </MenuItem>
            }
            { session.name ?
            <MenuItem onClick={()=>history.push('/result')} style={{backgroundColor:'#8017bd'}} hoverable>
                View Story
            </MenuItem>
            :
            <MenuItem style={{backgroundColor:'#d3d3d3', color:'black'}}>
                View Story
            </MenuItem>
            }
            { session.name ?
            <MenuItem onClick={()=>history.push('/add')} style={{backgroundColor:'#aa42e8'}} hoverable>
                Add Chapter
            </MenuItem>
            :
            <MenuItem style={{backgroundColor:'#d3d3d3',color: 'black'}}>
                Add Chapter
            </MenuItem>
            }
            { session.name ?
            <MenuItem onClick={onReset} style={{backgroundColor:'#cc8df1'}} hoverable>
                Reset
            </MenuItem>
            :
            <MenuItem style={{backgroundColor:'#d3d3d3',color:'black'}}>
                Reset
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
        />
        
    </>
    )
}