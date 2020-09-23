import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom"
import { Image, Navbar, NavDropdown } from 'react-bootstrap'
import ActionsUserRegistration from '../actions/UserRegistration/UserRegistration'
import logoImg from '../assets/logo.png'

export default function Nav (props) {
    let history = useHistory()
    const [user, setUser] = useState('');

    useEffect(() => {
        ActionsUserRegistration.getUserById(props.id)
        .then((r) => {
            setUser(r)
        })
    }, [props.id]);
    
    const logoutUser = () => {
        props.logout() 
        history.push("/");
    }

    const style = {
        navStyle: {
            'background': '#9ccc65',
            // position: fixed;
            // width: 100vw;
            // top: 0;
            // z-index: 2;
        },
        img: {
            'box-shadow': '0px 0px 22px white'
        },
        nameTitle: {
            'font-style': 'italic',
            'font-size': '1.5em'
        }
    }

    return (
        <Navbar style={style.navStyle}>
            <Navbar.Brand>

            <img
                src={logoImg}
                width="80"
                height="80"
                className="d-inline-block align-top"
                alt="Logo"
                onClick={()=>{history.push('/Dashboard')}}
            />
            </Navbar.Brand>
            <span className="user-name" style={style.nameTitle} onClick={()=>{history.push('/Dashboard')}}>Aluguel de quadras</span>
            
            <Navbar.Collapse className="justify-content-end">
                <Image src={user.image_base_64} roundedCircle height="60" width="60" style={style.img}/><br/>
                <NavDropdown title={user.name} id="collasible-nav-dropdown">
                <NavDropdown.Item onClick={logoutUser}>Sair</NavDropdown.Item>
            </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}

