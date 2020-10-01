import React, { Fragment , useState} from 'react'
import { useHistory } from "react-router-dom"
import { Container, Row, Col , InputGroup, FormControl, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Loader from '../../component/Loader'
import InputImage from '../../component/InputImage'
import Actions from '../../actions/UserRegistration/UserRegistration'
import './UserRegistration.css'

const UserRegistration = () => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('O nome é obrigatório'),
        email: Yup.string().email('Insira um e-mail válido').required('O email é obrigatório'),
        password: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória'),
        phone: Yup.string().min(11, 'No mínimo 11 caracteres').required('O telefone é obrigatória')
    })

    const submit = values => {
        const {
            name,
            email,
            password,
            phone,
            image_base_64,
        } = values

        setLoading(true)
        Actions.createUser({
            name,
            email, 
            password, 
            phone, 
            image_base_64: image_base_64 ? image_base_64 : undefined})
            .then((r) => {
                setLoading(false)
                history.push({
                    pathname: '/',
                    param: {
                        email: email
                    }
                })

            }).catch((e) => {
                setLoading(false)
            })
    }

    const formik = useFormik({
            initialValues: {
                name: '',
                password: '',
                password_confirm: '',
                email: '',
                phone: '',
                image_base_64: null
            },
            onSubmit: submit,
            validationSchema});
    
    const callbackSetBase64 = (value) => {
        formik.values.image_base_64 = value
    }


    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit} className={!formik.isValid ? 'not-valid' : ''}>
                <Container>
                    <Loader loading={loading}/>
                    <Row>
                        <Col md="">
                            <InputGroup className="mt-3">
                                <FormControl
                                        placeholder="Nome"
                                        name="name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                    />
                            </InputGroup>
                            {formik.errors.name 
                                ? <div className="feed-back-error-input">{formik.errors.name}</div>
                                :''
                            }
                        </Col>
                        <Col md="">
                            <InputGroup className="mt-3">
                                <FormControl
                                        placeholder="Email"
                                        name="email"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.email}
                                    />
                            </InputGroup>
                            {formik.errors.email 
                                ? <div className="feed-back-error-input">{formik.errors.email}</div>
                                :''
                            }
                        </Col>
                    </Row>
                    <Row>
                        <Col md="">
                            <InputGroup className="mt-3">
                                <FormControl
                                        placeholder="Senha"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                            </InputGroup>
                            {formik.errors.password 
                                ? <div className="feed-back-error-input">{formik.errors.password}</div>
                                :''
                            }
                        </Col>
                        <Col md="">
                            <InputGroup className="mt-3">
                                <FormControl
                                        placeholder="Fone"
                                        name="phone"
                                        type="text"
                                        onChange={formik.handleChange}
                                        value={formik.values.phone}
                                    />
                            </InputGroup>
                            {formik.errors.phone 
                                ? <div className="feed-back-error-input">{formik.errors.phone}</div>
                                :''
                            }
                        </Col>
                    </Row>

                    <InputImage callbackSetBase64={callbackSetBase64}/>

                    <Row>
                        <Button variant="dark" type="submit" className="mt-3 mr-3 ml-3 float-right">
                            Criar conta
                        </Button>
                    </Row>

                </Container>
            </form>
        </Fragment>
        
    )
}
 export default UserRegistration