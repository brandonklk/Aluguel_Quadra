import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import { GrRevert } from "react-icons/gr";
import { Container, Row, Col, Button, Modal, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Loader from '../../component/Loader'
import Table from '../../component/Table'

import Actions from '../../actions/TennisCourts/TennisCourts'
import ActionsUserRegistration from '../../actions/UserRegistration/UserRegistration'
import { getIdOfUser } from '../../helper/UserUtilis';
import './TennisCourts.css'

import {makeArrayHours} from '../../component/Checklist'

export default function TennisCourts () {
    const [loading, setLoading] = useState('');
    const [list, setList] = useState([]);
    const [item, setItem] = useState({});
    const [user, setUser] = useState({name:''});
    const [errorAlert, setErrorAlert] = useState(false);
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

    const validationSchemaModal = Yup.object({
        nameModal: Yup.string().required('O nome é obrigatório'),
        valueModal: Yup.number().required('O valor é obrigatório'),
        horario_inicio_modal: Yup.string().required('Selecione o horário inicial'),
        horario_final_modal: Yup.string().required('Selecione o horário final'),
    })

    useEffect(() => {
        ActionsUserRegistration.getUserById(parseInt(getIdOfUser()))
        .then((r) => {
            setUser(r)
        })
    }, []);

    useEffect(()=>{
        setTimeout(() => {
            setErrorAlert(false);
        }, 10000);
    }, [errorAlert]);

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

    const edit = (values) => {
        const { nameModal: name, valueModal: value,
            horario_inicio_modal: horario_inicio, 
            horario_final_modal: horario_final } = values 
        const { id: owner_id } = user;
        const { id } = item;

        setLoading(true)
        Actions.edit({ id, name, value, owner_id, horario_inicio, horario_final })
            .then((r)=>{
                setLoading(false)
                handleModalEditClose()                
                getList()
            })
            .catch((err)=>{
                console.error(err); 
                setLoading(false);
                setErrorAlert(true);
            })
    }
    
    const formikModal = useFormik({
        initialValues: {
            nameModal: item.name,
            valueModal: item.value,
            horario_inicio_modal: item.horario_inicio,
            horario_final_modal: item.horario_final
        },
        onSubmit: edit,
        validationSchema: validationSchemaModal,
        enableReinitialize: true
    });

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
                
                <Alert variant="danger" show={errorAlert}>Ocorreu um erro ao salvar os dados da quadra.</Alert>
                <form 
                    onSubmit={formikModal.handleSubmit}
                    className={!formikModal.isValid ? 'not-valid' : ''}
                    autoComplete="off"
                >
                    <Modal.Body>
                        <input placeholder="Nome"
                            type="text"
                            name="nameModal"
                            value={formikModal.values.nameModal}
                            onBlur={formikModal.handleBlur}
                            onChange={formikModal.handleChange}
                        />
                        {formikModal.touched.nameModal && formikModal.errors.nameModal
                            ? <div className="feed-back-error-input">{formikModal.errors.nameModal}</div>
                            :''
                        }
                        <input
                            type="number"
                            placeholder="Valor"
                            name="valueModal"
                            value={formikModal.values.valueModal}
                            onBlur={formikModal.handleBlur}
                            onChange={formikModal.handleChange}
                        />
                        {formikModal.touched.valueModal && formikModal.errors.valueModal 
                            ? <div className="feed-back-error-input">{formikModal.errors.valueModal}</div>
                            :''
                        }
                        <label>Horário inicial</label>
                        <select id="horario_inicio_modal" 
                            name="horario_inicio_modal"
                            value={formikModal.values.horario_inicio_modal}
                            onBlur={formikModal.handleBlur}
                            onChange={formikModal.handleChange}
                        >
                        {renderOptionsHorario('horario_inicio_modal')}
                        </select>
                        {formikModal.touched.horario_inicio_modal && formikModal.errors.horario_inicio_modal 
                            ? <div className="feed-back-error-input">{formikModal.errors.horario_inicio_modal}</div>
                            :''
                        }

                        <label>Horário final</label>
                        <select id="horario_final_modal" 
                            name="horario_final_modal" 
                            value={formikModal.values.horario_final_modal}
                            onBlur={formikModal.handleBlur}
                            onChange={formikModal.handleChange}
                        >
                        {renderOptionsHorario('horario_final_modal')}
                        </select>
                        {formikModal.touched.horario_final_modal && formikModal.errors.horario_final_modal 
                            ? <div className="feed-back-error-input">{formikModal.errors.horario_final_modal}</div>
                            :''
                        }
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button variant="success" type="submit">Salvar</Button>
                        <Button variant="link" onClick={()=>{handleModalEditClose()}}>Fechar</Button>
                    </Modal.Footer>
                </form>
            </Modal>
            {user.permission === 1 ?
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
            : <h1 className="text-center">Você não tem permissão de acesso a essa módulo. 
              <GrRevert className="ml-4 icon-revert" onClick={() => history.push('Dashboard')}/>
              </h1>}
        </Fragment>
    );
}
