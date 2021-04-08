import { Modal, Input } from 'antd'
import { useEffect } from 'react'
import { setSessionCookie, getSessionCookie } from '../store/session'
export function NewStoryModal(props){
    const { 
        isModalVisible, 
        setIsModalVisible, 
        storyName, 
        setStoryName,
        hasStoryName,
        setHasStoryName 
    } = props

    useEffect(()=>{
        setIsModalVisible(isModalVisible)
    },[isModalVisible])

    const handleOk = () => {
        if(storyName !== ''){
            setHasStoryName(true)
            setSessionCookie({name: storyName})
            .then(async res => {
                if(res.isSuccess){
                    const session = await getSessionCookie()
                    if(session.name){
                        setIsModalVisible(false)
                        console.log('Session : ',session)
                    }
                }
            })
            .catch(err => {
                if(!err.isSuccess){
                    alert('Create New Story Error')
                }
            })
        }
    }
    const handleCancel = () => {
        setIsModalVisible(false)
    }
    const handleStoryNameChange = e => {
        setStoryName(e.target.value)
    }
    return(
        <Modal
            title="Add New Story"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            Name: <Input onChange={handleStoryNameChange} value={storyName} />
        </Modal>
    )
}