import React, {useState, useEffect, Fragment} from 'react'
import { useHistory } from "react-router-dom"
import { Image, Navbar, NavDropdown } from 'react-bootstrap'
import ActionsUserRegistration from '../actions/UserRegistration/UserRegistration'
import logoImg from '../assets/logo.png'

export default function Nav (props) {
    let history = useHistory()
    const [user, setUser] = useState({name:''});

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
            'box-shadow': '0px 0px 10px black',
            "border": '1px solid white'
        },
        nameTitle: {
            'fontStyle': 'italic',
            'fontSize': '1.5em'
        },
        nameUser: {
            'marginRight': '3.5em'
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
                
                {   user.image_base_64 
                    ? <Image src={user.image_base_64} roundedCircle height="60" width="60" style={style.img}/> 
                    : <Fragment/>
                }                
                
                <NavDropdown title={user.name} style={style.nameUser} id="collasible-nav-dropdown">
                    <NavDropdown.Item onClick={()=>{}}>Editar perfil</NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutUser}>Sair</NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
        </Navbar>
    );
}

