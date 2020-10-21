import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Loader from '../../component/Loader'
import Table from '../../component/Table'

import Actions from '../../actions/TennisCourts/TennisCourts'
import ActionsUserRegistration from '../../actions/UserRegistration/UserRegistration'
import './TennisCourts.css'

import {makeArrayHours} from '../../component/Checklist'

export default function TennisCourts () {
    const [loading, setLoading] = useState('');
    const [list, setList] = useState([]);
    const [item, setItem] = useState({});
    const [user, setUser] = useState({name:''});
    const history = useHistory()

    const [showModalEdit, setShowModalEdit ] = useState(false)
    const handleModalEditClose = () => setShowModalEdit(false);
    const handleModalEditShow = () => setShowModalEdit(true);

    const validationSchema = Yup.object({
        name: Yup.string().required('O nome é obrigatório'),
        value: Yup.number().required('O valor é obrigatório'),
        horario_inicio: Yup.string().required('Selecione o horário inicial'),
        horario_final: Yup.string().required('Selecione o horário final'),
    })

    useEffect(() => {
        ActionsUserRegistration.getUserById()
        .then((r) => {
            setUser(r)
        })
    }, []);

    const create = (values, { resetForm }) => {
        setLoading(true)
        Actions.create(values)
            .then((r) => {
                setLoading(false)
                if (r.id) 
                    getList()
                    resetForm({})
            })
            .catch((error) => {
                setLoading(false)
            })
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            value: ''
        },
        onSubmit: create,
        validationSchema});

    
    useEffect(() => {
        getList()
    }, []);

    const getList = () => {
        setLoading(true)
        Actions.getAll()
            .then((r) => {
                setList(r.map((i) => {
                    delete i.owner_id 
                    return i
                }))
                setLoading(false)
            })
    }

    const FuncDelete = (id) => {
        setLoading(true)
        Actions.remove(id)
            .then((r) => {
                setLoading(false)
                getList()
            }).catch((error)=>console.log(error))
    }

    const FuncEdit = (id) => {
        setLoading(true)
        Actions.getById(id)
            .then((item) => {
                setLoading(false)
                setItem(item)
                handleModalEditShow()
            })
            .catch((error) => {console.log(error)})
    }

    const edit = () => {
        setLoading(true)
        Actions.edit(item)
            .then((r)=>{
                setLoading(false)
                handleModalEditClose()                
                getList()
            })
            .catch((r)=>{console.log(r)})
    }

    const renderOptionsHorario = (id) => {
        const horario_inicio = "07:00"
        const horario_fim = "22:00"
        let arr = makeArrayHours(horario_inicio, horario_fim)

        return (
            <Fragment>
                {
                    arr.map((item) => {
                        return (
                            <option key={`${id}-${item.value}`} value={item.value}>{item.value}</option>
                        )
                    })
                }
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            <Loader loading={loading} />

            <Modal show={showModalEdit} onHide={handleModalEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <form>
                            <input placeholder="Nome"
                                type="text"
                                name="name"
                                value={item.name}
                                onChange={(e) => {setItem({...item, name: e.target.value})}}/>

                            <input
                                type="number"
                                placeholder="Valor"
                                name="value"
                                value={item.value}
                                onChange={(e) => {setItem({...item, value: e.target.value})}}
                            />

                            <label>Horário inicial</label>
                            <select id="horario_inicio" 
                                    name="horario_inicio"
                                    value={item.horario_inicio}
                                    onChange={(e) => {setItem({...item, horario_inicio: e.target.value})}}
                                    >
                                {renderOptionsHorario('horario_inicio_modal')}
                            </select>

                            <label>Horário final</label>
                            <select id="horario_final" 
                                    name="horario_final" 
                                    value={item.horario_final}
                                    onChange={(e) => {setItem({...item, horario_final: e.target.value})}}
                                    >
                                {renderOptionsHorario('horario_final_modal')}
                            </select>
                        </form>
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant="success" onClick={edit}>Salvar</Button>
                        <Button variant="link" onClick={()=>{handleModalEditClose()}}>Fechar</Button>
                    </Modal.Footer>
            </Modal>
            {user.permission == 1 ?
            <Container className="mt-5">
                <h1 className="title">Cadastro de Quadra</h1>
                <Row>
                    <Table head={['Id','Nome','Valor hora', 'Horário inicial', 'Horário final']} body={list} FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
                </Row>
                <form onSubmit={formik.handleSubmit} className={!formik.isValid ? 'not-valid' : ''} autoComplete="off">
                    <Row>
                        <Col md="6">
                            <input
                                placeholder="Nome"
                                type="text"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                            {formik.errors.name 
                                ? <div className="feed-back-error-input">{formik.errors.name}</div>
                                :''
                            }
                        </Col>
                        <Col md="6">
                            <input
                                type="number"
                                placeholder="Valor"
                                name="value"
                                onChange={formik.handleChange}
                                value={formik.values.value}
                            />
                            {formik.errors.value
                                ? <div className="feed-back-error-input">{formik.errors.value}</div>
                                : ''
                            }
                        </Col>
                        <Col md="6">
                            <label>Horário inicial</label>
                            <select id="horario_inicio" 
                                    name="horario_inicio"
                                    onChange={formik.handleChange}
                                    value={formik.values.horario_inicio}>
                                {renderOptionsHorario('horario_inicio')}
                            </select>
                            {formik.errors.horario_inicio
                                ? <div className="feed-back-error-input">{formik.errors.horario_inicio}</div>
                                : ''
                            }
                        </Col>
                        <Col md="6">
                            <label>Horário final</label>
                            <select id="horario_final" 
                                    name="horario_final" 
                                    onChange={formik.handleChange}
                                    value={formik.values.horario_final}>
                                {renderOptionsHorario('horario_final')}
                            </select>
                            {formik.errors.horario_final
                                ? <div className="feed-back-error-input">{formik.errors.horario_final}</div>
                                : ''
                            }
                        </Col>
                        <Col>
                            <button variant="dark" type="submit" className="mt-3 float-right">
                                Criar
                            </button>
                        </Col>
                    </Row>
                </form>
            </Container>
            : history.push('/Dashboard')}
        </Fragment>
    );
}
