import React from 'react';
import { Button, Navbar } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { FaSignOutAlt } from 'react-icons/fa';

const Header = ({ history }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['']);
    const onLogout = () => {
        removeCookie('user');
        history.push('/login')
    }
    return (
        <Navbar bg="light" expand="lg" className="justify-content-between">
            <Navbar.Brand style={{
                cursor: 'pointer'
            }} onClick={()=> history.push('/home')}>Flow Map</Navbar.Brand>
            <Button className="ml-1 d-flex align-items-center justify-content-between" variant="light" >
                <FaSignOutAlt onClick={() => onLogout()} />
            </Button>
        </Navbar>
    )
}

export default Header;