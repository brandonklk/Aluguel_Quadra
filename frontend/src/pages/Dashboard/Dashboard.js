import React, {useState, useEffect, Fragment} from 'react'
import { Image, Col, Container, Row, Navbar, NavDropdown, Card, Modal, Button  } from 'react-bootstrap'
import { logout } from '../../services/auth.js'
import Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import Loader from '../../component/Loader'
import logoImg from '../../assets/logo.png';
import ActionsUserRegistration from '../../actions/UserRegistration/UserRegistration'
import './Dashboard.css'


export default function Dashboard (props) {
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [item, setItem] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [date, setDate] = useState(new Date());
        
    const onChange = date => {
        setDate(date)
    }

    const onClick = () => {
        alert('data: ' + date.toISOString())   
    }
    
    const onClickAgendamento = (item) => {
        setItem(item)
        handleShow()
    }

    const lista = [
        {
            id: 1, 
            descricao: 'Segunda - 15/09/2020', 
            horarios: [
                {
                    horario_inicio: '12:00', 
                    horario_fim: '13:00',
                    valor: 50.00
                }
            ], 
            horario_inicio: '12:00', 
            horario_fim: '13:00',
            valor_total: 50
        },
        {
            id: 2, 
            descricao: 'Terça - 16/09/2020', 
            horarios: [
            {
                horario_inicio: '12:00', 
                horario_fim: '13:00',
                valor: 50.00
            },
            {
                horario_inicio: '14:00', 
                horario_fim: '15:00',
                valor: 50.00
            },
        ],
            horario_inicio: '13:00', 
            horario_fim: '14:00', 
            valor_total: 100.00
        }
    ]

    useEffect(() => {
        setLoading(false)
    }, []);

    const renderHorarios = (item) => {
        return (
            <div>
                <Card.Subtitle className="mb-2 text-muted">Horário{item.horarios.length > 1 ? 's' :''}:</Card.Subtitle>
                {item.horarios.map((h) => {
                    return (
                    <Card.Subtitle className="mb-2 text-muted"> 
                        > {h.horario_inicio} às {h.horario_fim} R$:{h.valor} 
                        {/* <Button variant="danger">Remover</Button> */}
                    </Card.Subtitle>);
                })}
                <hr/>
            </div>
        );
    }

    const TemplateAgendamentos = (props) => {
        const {arr} = props
        return (
            <div>
                {
                    arr.map((item) => {
                        return (
                            <Card body className="mt-2" onClick={()=> {onClickAgendamento(item)}}>
                                <Card.Title>{item.descricao}</Card.Title>
                                {renderHorarios(item)}
                                <Card.Subtitle className="mb-2 text-muted">Valor total: R$: {item.valor_total}</Card.Subtitle>
                            </Card>
                        )
                    })
                }                
            </div>
        );
    }

    const renderConteudoDeModal = () => {
        return (
            <div>
                {item.horarios ? renderHorarios(item) : ''}
                <Card.Subtitle className="mb-2 text-muted">Valor total: R$:{item.valor_total}</Card.Subtitle>
            </div>
        );
    }

    return (
        <Fragment>
            <Loader loading={loading} />
            <Container className="mt-5">
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Agendamento: {item.descricao}</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        {renderConteudoDeModal()}
                    </Modal.Body>
                
                    <Modal.Footer>
                        {/* <Button variant="danger">Desmarcar</Button> */}
                        <Button variant="link" onClick={()=>{handleClose()}}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <Row>
                    <Col>
                        <h3>Agendamentos:</h3>
                        <TemplateAgendamentos arr={lista}/>
                    </Col>

                    <Col md="6">
                        <Calendar
                        onClickDay={onClick}
                        onChange={onChange}
                        value={date}
                        />    
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}