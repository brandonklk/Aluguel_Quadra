import React, { Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, InputGroup, FormControl, Button, Modal } from 'react-bootstrap'

import Loader from '../../component/Loader'
import Table from '../../component/Table'

import Actions from '../../actions/TennisCourts/TennisCourts'
import './TennisCourts.css'

export default function TennisCourts () {
    const [loading, setLoading] = useState('');
    const [list, setList] = useState([]);
    const [name, setName] = useState('');
    const [item, setItem] = useState({});

    const [showModalEdit, setShowModalEdit ] = useState(false)
    const handleModalEditClose = () => setShowModalEdit(false);
    const handleModalEditShow = () => setShowModalEdit(true);

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

    const create = () => {
        setLoading(true)
        Actions.create({name: name})
            .then((r) => {
                setLoading(false)
                setName('')
                if (r.id) {
                    getList()
                }
            })
            .catch((error) => {})
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
        Actions.edit(
            {
                id: item.id,
                name: item.name
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
                    </Modal.Body>
                
                    <Modal.Footer>
                        <Button variant="success" onClick={edit}>Salvar</Button>
                        <Button variant="link" onClick={()=>{handleModalEditClose()}}>Fechar</Button>
                    </Modal.Footer>
            </Modal>

            <Container className="mt-5">
                <h1 className="title">Cadastro de Quadra</h1>
                <Row>
                    <Table head={['Id','Nome']} body={list} FuncDelete={FuncDelete} FuncEdit={FuncEdit}/>
                </Row>

                <Row>
                    <Col md="">
                        <InputGroup className="mt-3">
                                <FormControl
                                    placeholder="Nome"
                                    aria-label="Nome"
                                    aria-describedby="name"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                            />
                            </InputGroup> 
                    </Col>
                    <Col md=" ">
                        <Button variant="dark" type="button" className="mt-3 float-right" onClick={create}>
                            Criar
                        </Button>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}
