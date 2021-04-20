import { useLocation, Link } from 'react-router-dom'
import { Menu } from 'antd'
import styled from 'styled-components'
import { getSessionCookie } from '../store/session'
const MenuStyle = styled(Menu)`
    background-color: white;
    border-color: #A214CD;
    padding: 0.5em;
    &.ant-menu {
        font-size: 1.2vw;
    }
`
const ItemStyle = styled(Menu.Item)`
    &.ant-menu-item a {
        color: #A214CD;
        text-align: center;
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
                    <Link to={'/'}>หน้าหลัก</Link>
                </ItemStyle>
                <ItemStyle>
                    <Link to={'/add'}>เพิ่มตอน</Link>
                </ItemStyle>
                <ItemStyle>
                    <Link to={'/result'}>แสดงผลลัพธ์</Link>
                </ItemStyle>
                { name ?
                <ItemStyle style={{float: 'right'}}>
                    <Link to={'/'}>เรื่อง : {name}</Link>
                </ItemStyle>
                :
                null
                }
            </MenuStyle>
            }
        </>
    )
}