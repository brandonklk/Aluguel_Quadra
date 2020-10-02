import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, InputGroup, FormControl, Button, Modal } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Loader from '../../component/Loader'
import Table from '../../component/Table'

import Actions from '../../actions/TennisCourts/TennisCourts'
import './TennisCourts.css'

export default function TennisCourts () {
    const [loading, setLoading] = useState('');
    const [list, setList] = useState([]);
    const [item, setItem] = useState({});

    const [showModalEdit, setShowModalEdit ] = useState(false)
    const handleModalEditClose = () => setShowModalEdit(false);
    const handleModalEditShow = () => setShowModalEdit(true);

    const validationSchema = Yup.object({
        name: Yup.string().required('O nome é obrigatório'),
        value: Yup.number().required('O valor é obrigatório')
    })

    const create = (values, { resetForm }) => {
        const {name, value} = values

        setLoading(true)
        Actions.create({name, value})
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
        const {id, name, value} = item

        setLoading(true)
        Actions.edit({
                id,
                name,
                value
            }).then((r)=>{
                setLoading(false)
                handleModalEditClose()                
                getList()
            })
            .catch((r)=>{console.log(r)})
    }
    
    return (
        <Fragment>
            <Loader loading={loading} />

            <Modal show={showModalEdit} onHide={handleModalEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar</Modal.Title>
                    </Modal.Header>
                
                    <Modal.Body>
                        <InputGroup className="mt-3">
                                <FormControl
                                    placeholder="Nome"
                                    aria-label="Nome"
                                    aria-describedby="name"
                                    value={item.name}
                                    onChange={(e) => {setItem({...item, name: e.target.value})}}
                                />
                            </InputGroup> 
                            <InputGroup className="mt-3">
                                <FormControl
                                    placeholder="Valor"
                                    name="valor"
                                    value={item.value}
                                    onChange={(e) => {setItem({...item, value: e.target.value})}}
                                />
                            </InputGroup> 
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant="success" onClick={edit}>Salvar</Button>
                        <Button variant="link" onClick={()=>{handleModalEditClose()}}>Fechar</Button>
                    </Modal.Footer>
            </Modal>

            <Container className="mt-5">
                <h1 className="title">Cadastro de Quadra</h1>
                <Row>
                    <Table head={['Id','Nome','Valor hora']} body={list} FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
                </Row>
                <form onSubmit={formik.handleSubmit} className={!formik.isValid ? 'not-valid' : ''} autoComplete="off">
                    <Row>
                        <Col md="6">
                            <InputGroup className="mt-3">
                                <FormControl
                                    placeholder="Nome"
                                    name="name"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                            />
                            </InputGroup>
                            {formik.errors.name 
                                ? <div className="feed-back-error-input">{formik.errors.name}</div>
                                :''
                            }
                        </Col>
                        <Col md="6">
                            <InputGroup className="mt-3">
                                <FormControl
                                    type="number"
                                    placeholder="Valor"
                                    name="value"
                                    onChange={formik.handleChange}
                                    value={formik.values.value}
                            />
                            </InputGroup> 
                            {formik.errors.value
                                ? <div className="feed-back-error-input">{formik.errors.value}</div>
                                : ''
                            }
                        </Col>
                        <Col>
                            <Button variant="dark" type="submit" className="mt-3 float-right">
                                Criar
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </Fragment>
    );
}
