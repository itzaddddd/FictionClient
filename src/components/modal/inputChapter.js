import {useState} from 'react'
import { Modal, Input } from 'antd'
import styled from 'styled-components'
import { setSessionCookie, getSessionCookie } from '../../store/session'

const { TextArea } = Input

const TextAreaStyle = styled(TextArea)`
    
        border-color: var(--color-topic-main);
        border-radius: 1em;
        ::-webkit-scrollbar {
            width: 8px;
            background-color: white;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 12px;
            background-color: var(--color-topic-main);
        }
        :hover, :focus {
            border-color: var(--color-topic-main);
            outline: 0;
            -webkit-box-shadow: 0 0 0 2px var(--color-bg-base);
            box-shadow: 0 0 0 2px var(--color-bg-base);
        }
    
`

const ModalStyle = styled(Modal)`
    .ant-modal-content {
        overflow: auto;
        border-radius: 1em;
        font-family: 'Bai Jamjuree';
    }
    .ant-modal-header {
        background-color: var(--color-topic-main);
    }
    .ant-modal-title {
        font-size: 1.5em;
        color: white;
        text-align: center;
    }
    .ant-modal-close {
        color: white;
        font-size: 2em;
    }
    .ant-btn {
        border-radius: 0.5em;
    }
    .ant-btn:hover {
        border-color: var(--color-topic-main);
        color: var(--color-topic-main);
    }
    .ant-btn-primary {
        background-color: var(--color-topic-main);
        border-color: var(--color-topic-main);
        border-radius: 0.5em;
    }
    .ant-btn-primary:hover {
        background-color: var(--color-new-chap);
        border-color: var(--color-new-chap);
        color: white;
    }
`

export function InputChapter(props){
    const [isShowError, setIsShowError] = useState(true)
    const { 
        isModalVisible, 
        setIsModalVisible,
        value,
        setValue,
        setContent,
        setIsSubmit,
        predictGenre,
        setIsLoading 
    } = props 

    const onOk = () => {
        setIsLoading(true)
        const currentData = JSON.parse(getSessionCookie('content'))
        let dataArray = []
        if(currentData){
            dataArray = JSON.parse(currentData)
            const newData = {
                index: dataArray.length+1,
                text: value
            }
            dataArray.push(newData)
            predictGenre(newData.text)
        }else{
            const newData = {
                index: 1,
                text: value
            }
            dataArray.push(newData)
            predictGenre(newData.text)
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
        setIsModalVisible(false)
    }

    const onCancel = () => {
        setValue('')
        setIsModalVisible(false)
    }

    const onChange = e => {
        setValue(e.target.value)
        console.log(e.target.value.length)
        if(e.target.value.length < 1000) setIsShowError(true)
        else setIsShowError(false)
    }

    return(
        <ModalStyle
            title="เพิ่มตอนใหม่"
            visible={isModalVisible}
            onOk={onOk}
            onCancel={onCancel}
            okText="เพิ่มตอน"
            cancelText="ยกเลิก"
            width={1200}
            okButtonProps={{disabled:isShowError}}

        >
            <TextAreaStyle rows={22} style={{fontSize: '0.8vw'}} value={value} onChange={onChange} />
            {isShowError?'*เนื้อหาต้องยาวอย่างน้อย 1000 ตัวอักษร':null}
        </ModalStyle>
    )
}

 