import React, {useContext} from 'react';
import {Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/useRedux";
import {logout} from "../store/slices/authSlice";

const NavBar = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user = useAppSelector(state=> state.auth.user)
    const {pathname} = useLocation()

    const handleChange = () => {
        dispatch(logout())
        navigate('/login')
    }

    const handleExit = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate('/')}>АВТОВОКЗАЛЫ ДОНБАССА</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link
                        active={pathname === '/'}
                        onClick={() => navigate('/')}
                    >
                        Главная
                    </Nav.Link>
                    <Nav.Link
                        active={pathname === '/timetableAll'}
                        onClick={() => navigate('/timetableAll')}
                    >
                        Распсиание
                    </Nav.Link>
                    <Nav.Link
                        active={pathname === '/about'}
                        onClick={() => navigate('/about')}
                    >
                        Информация
                    </Nav.Link>
                    <Nav.Link
                        active={pathname === '/contacts'}
                        onClick={() => navigate('/contacts')}
                    >
                        Контакты
                    </Nav.Link>
                </Nav>
                {user
                    ? <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className={"text-white me-2"}>Диспетчер:</Navbar.Text>
                        <Dropdown>
                            <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                                <b>{user.username}</b>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => navigate('/admin')} className={"text-dark"}>Панель управления</Dropdown.Item>
                                <Dropdown.Item onClick={handleChange} className={"text-dark"}>Сменить пользователя</Dropdown.Item>
                                <Dropdown.Item onClick={handleExit} className={"text-dark"}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Navbar.Collapse>
                    : <></>}
            </Container>
        </Navbar>
    );
};

export default NavBar;