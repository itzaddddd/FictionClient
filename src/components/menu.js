import { useLocation, Link } from 'react-router-dom'
import { Menu } from 'antd'
import styled from 'styled-components'
import { getSessionCookie } from '../store/session'
import { HomeOutlined, FileAddOutlined, LineChartOutlined } from '@ant-design/icons'

const MenuStyle = styled(Menu)`
    background-color: var(--color-menu-bg-main);
    border-color: var(--color-menu-bg-main);
    padding: 0.5em;
    &.ant-menu {
        font-size: 1.2vw;
    }
`
const ItemStyle = styled(Menu.Item)`
    &.ant-menu-item a {
        color: white;
        padding: 0.5em;
        border-radius: 0.5em;
    }
    &.ant-menu-item a:hover {
        color: white;
        background-color: var(--color-menu-bg-sec);
    }
    &.ant-menu-item-selected {
        border-radius: 0.5em;
        background-color: var(--color-menu-bg-sec);
    }
`
export const AppMenu = () => {
    const { pathname } = useLocation()
    const name = JSON.parse(getSessionCookie('name'))
    
    return(
        <>
            { pathname !== '/' 
            &&
            <MenuStyle mode='horizontal'>
                <ItemStyle>
                    <Link to={'/'}><HomeOutlined style={{fontSize:'1em'}} />หน้าหลัก</Link>
                </ItemStyle>
                <ItemStyle>
                    <Link to={'/add'}><FileAddOutlined style={{fontSize:'1em'}} />เพิ่มตอน</Link>
                </ItemStyle>
                <ItemStyle>
                    <Link to={'/result'}><LineChartOutlined style={{fontSize:'1em'}} />แสดงผลลัพธ์</Link>
                </ItemStyle>
                { name ?
                <ItemStyle style={{float: 'right'}}>
                    <Link to={'/'}>{name}</Link>
                </ItemStyle>
                :
                null
                }
            </MenuStyle>
            }
        </>
    )
}