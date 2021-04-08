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
    const session = getSessionCookie()
    
    return(
        <>
            { pathname !== '/' 
            &&
            <MenuStyle mode='horizontal'>
                <ItemStyle>
                    <Link to={'/'}>Home</Link>
                </ItemStyle>
                <ItemStyle>
                    <Link to={'/result'}>View Story</Link>
                </ItemStyle>
                <ItemStyle>
                    <Link to={'/add'}>Add Chapter</Link>
                </ItemStyle>
                { session.name ?
                <ItemStyle style={{float: 'right'}}>
                    <Link to={'/'}>Story : {session.name}</Link>
                </ItemStyle>
                :
                null
                }
            </MenuStyle>
            }
        </>
    )
}