import React, { Component, Fragment, useEffect, useState } from 'react'
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap'

import Loader from '../../component/Loader'
import Table from '../../component/Table'

import Actions from '../../actions/TennisCourts/TennisCourts'
import './TennisCourts.css'

export default function TennisCourts () {
    const [loading, setLoading] = useState(true);
    const [list, setList] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        getList()
    }, []);

    const getList = () => {
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
        Actions.create({name: name})
            .then((r) => {
                setName('')
                if (r.id) {
                    getList()
                }
            })
            .catch((error) => {})
    }

    const FuncDelete = (id) => {
        Actions.remove(id).then((r) => {getList()}).catch((error)=>console.log(error))
    }

    const FuncEdit = (id) => {
        console.log('id', id)
    }
    
    return (
        <Fragment>
            <Loader loading={loading} />
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
