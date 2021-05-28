import { Modal, Input } from 'antd'
import { useEffect } from 'react'
import { setSessionCookie, getSessionCookie } from '../../store/session'
import { ModalStyle } from './modal.style'
export function NewStoryModal(props){
    const { 
        isModalVisible, 
        setIsModalVisible, 
        storyName, 
        setStoryName,
        setHasStoryName,
        onSuccess,
        onError 
    } = props

    useEffect(()=>{
        setIsModalVisible(isModalVisible)
    },[isModalVisible])

    const handleOk = () => {
        if(storyName !== ''){
            setHasStoryName(true)
            setSessionCookie('name', storyName)
            .then(async res => {
                if(res.isSuccess){
                    const name = getSessionCookie('name')
                    if(name !== undefined){
                        setIsModalVisible(false)
                        onSuccess()
                    }
                }else{
                    onError()
                }
            })
            .catch(err => {
                if(!err.isSuccess){
                    onError()
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
        <ModalStyle
            title="เพิ่มเรื่องใหม่"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={'ตกลง'}
            cancelText={'ยกเลิก'}
        >
            ชื่อเรื่อง <Input onChange={handleStoryNameChange} value={storyName} />
        </ModalStyle>
    )
}