import { Modal } from 'antd'
import styled from 'styled-components'

export const ModalStyle = styled(Modal)`
    .ant-modal-content {
        overflow: auto;
        border-radius: 1em;
        font-family: 'Bai Jamjuree';
    }
    .ant-modal-close:hover {
        color: var(--color-topic-main);
    }
    .ant-btn {
        border-radius: 0.5em;
    }
    .ant-btn:hover {
        border-color: var(--color-topic-main);
        color: var(--color-topic-main);
    }
    .ant-btn-primary {
        border-color: var(--color-topic-main);
        background-color: var(--color-topic-main);
    }
    .ant-btn-primary:hover {
        background-color: var(--color-new-chap);
        border-color: var(--color-new-chap);
        color: white;
    }
    input.ant-input {
        border-radius: 0.5em;
    } 
    input.ant-input:hover {
        border-color: var(--color-topic-main);
    } 
    input.ant-input:focus {
        border-color: var(--color-topic-main);
        outline: 0;
        -webkit-box-shadow: 0 0 0 2px var(--color-bg-base);
        box-shadow: 0 0 0 2px var(--color-bg-base);
    } 
`