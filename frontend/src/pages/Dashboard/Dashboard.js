import React, {useState, useEffect, Fragment} from 'react'
import { Col, Container, Row, Modal, Button, ButtonGroup, Card  } from 'react-bootstrap'
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

    const [item, setItem] = useState({});
    const [date, setDate] = useState(new Date());
    
    let [arrayScheduling, setScheduling] = useState([]);
    let [arrayCopyScheduling, setCopyScheduling] = useState([]);

    const onChange = date => {
        setDate(date)
      
        const d = date.getDate() < 10 ? `0${date.getDate()*1}`: date.getDate()*1
        const m = date.getMonth() < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1
        const y = date.getFullYear()
        const date_filter = `${d}/${m}/${y}`
      
        filter({setCopyScheduling:setCopyScheduling, 
            filter: {
                date: date_filter
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
        const d = date.getDate() < 10 ? `0${date.getDate()*1}`: date.getDate()*1
        const m = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}`: date.getMonth()+1
        const y = date.getFullYear()

        
        setLoading(true)
        ActionsSchedules.create({
            date: `${d}/${m}/${y}`,
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