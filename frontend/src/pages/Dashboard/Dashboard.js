import React, {useState, useEffect, Fragment} from 'react'
import { Col, Container, Row, Modal, Button, Dropdown } from 'react-bootstrap'
import { formatDate } from '../../helper'
import { GrClock } from "react-icons/gr";

import Calendar  from 'react-calendar'
import 'react-calendar/dist/Calendar.css';

import Loader from '../../component/Loader'
import Checklist from '../../component/Checklist'
import CardAgendamento from '../../component/CardAgendamento'

import ActionsSchedules from '../../actions/Schedules/Schedules'
import ActionsTennisCourts from '../../actions/TennisCourts/TennisCourts'


import './Dashboard.css'

export default function Dashboard (props) {
    // Apagar Depois Quando quadra estiver dinamica
    const [quadra, setQuadra] = useState(0)
    
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showModalScheduling, setShowModalScheduling] = useState(false);
    const handleModalSchedulingClose = () => setShowModalScheduling(false);
    const handleModalSchedulingShow = () => setShowModalScheduling(true);

    const [date, setDate] = useState(new Date());
    
    let [arrayScheduling, setScheduling] = useState([]);
    let [arrayCopyScheduling, setCopyScheduling] = useState([]);

    const onChange = date => {
        setDate(date)

        filter({setCopyScheduling:setCopyScheduling, 
            filter: {
                date: formatDate(date)
            } , 
            callBack: () => { handleModalSchedulingShow()}})
    }
    
    const onClickAgendamento = () => console.log('onClickAgendamento')
    let array = []

    useEffect(() => {
        filter({})
    }, []);

    /*Buscando por quadra fixa*/
    useEffect(() => {
        ActionsTennisCourts.getAll()
            .then((r) => {
                setQuadra(r[0])
            })
            .catch((error) => {
                console.error(error)
                // window.reload
            })
    }, []);

    const saveOnScheduling = () => {
        setLoading(true)
        ActionsSchedules.create({
            date: formatDate(date),
            time: array,
            tennis_court_id: quadra.id,
            user_id: undefined,
        }).then((r) => {
            setLoading(false)
            filter({callBack: () => {handleModalSchedulingClose()}})
        }).catch((error) => {
            setLoading(false)
            console.log(error)
        })
    }

    const FuncCallBack = (arr) => {
        array = arr
    }

    const filter = (param) => {
        const setArrayCopy = typeof param.setCopyScheduling === 'function'
        
        setLoading(true)
        ActionsSchedules.getAll(param.filter ? param.filter : undefined)
            .then((r) => {
                setLoading(false)
                if (setArrayCopy) {
                    param.setCopyScheduling(r.data)
                    param.callBack()
                    return
                }
                
                setScheduling(r.schedules)
                if (typeof param.callBack === 'function')
                    param.callBack()
            })
            .catch((error) => {})
    }

    const removerScheduling = item => {
        setLoading(true)
        ActionsSchedules.remove({
                user: null,
                reservation_id: item.id,
            })
            .then((r) => {
                filter({callBack: () => {handleClose()}})
            })
            .catch((error) => {console.log(error)})
    }

    const applyFilterInAllScheduling = () => {
        setLoading(true)
        ActionsSchedules.getAll().then((r) => {
            setScheduling(r.schedules)
            setLoading(false)
        })
    }

    const applyFilterInCurrentDate = () => {
        setLoading(true)
        ActionsSchedules.getAll({ date: formatDate(date) }).then((r) => {
            setScheduling(r.schedules)
            setLoading(false)
        })
    }

    return (
        <Fragment>
            <Loader loading={loading} />
            <Container className="mt-5">
                <Modal show={showModalScheduling} onHide={handleModalSchedulingClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agendar <GrClock/></Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <Checklist FuncCallBack={FuncCallBack} arrayScheduling={arrayCopyScheduling} />
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant="success" onClick={()=>{saveOnScheduling()}}>Salvar</Button>
                        <Button variant="link" onClick={()=>{handleModalSchedulingClose()}}>Fechar</Button>
                    </Modal.Footer>
                </Modal>

                <Row>
                    <Col className="container-agendamento">
                        <h3>Agendamentos: {arrayScheduling.length === 0 ? 'Nenhum agendamento' : ''}</h3>

                        <Dropdown>
                            <Dropdown.Toggle variant="link">
                                Filtros
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => applyFilterInAllScheduling()} eventKey="1">Todas as datas</Dropdown.Item>
                                <Dropdown.Item onClick={() => applyFilterInCurrentDate()} eventKey="2">Data atual</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <CardAgendamento arr={arrayScheduling} onClick={onClickAgendamento} removerScheduling={removerScheduling}/>
                    </Col>

                    <Col md="6">
                        <Calendar
                            onChange={onChange}
                            value={date}
                        />    
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}