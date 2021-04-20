import { Modal } from 'antd'

export function ResetModal(props){
    const { isResetModalVisible, setIsResetModalVisible, onReset } = props
    const onOk = () => {
        onReset()
        setIsResetModalVisible(false)
    }
    const onCancel = () => {
        setIsResetModalVisible(false)
    }

    return (
        <Modal
            visible={isResetModalVisible}
            onOk={onOk}
            onCancel={onCancel}
            okText={'ยืนยัน'}
            cancelText={'ยกเลิก'}
        >
            ข้อมูลทั้งหมดจะหายไป คุณแน่ใจที่จะล้างข้อมูลหรือไม่?
        </Modal>
    )
}