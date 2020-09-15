import React, { Component, Fragment } from 'react'
import { Container, Row, Col , InputGroup, FormControl, Button } from 'react-bootstrap'
import Loader from '../../component/Loader'

import Actions from '../../actions/UserRegistration/UserRegistration'
import './UserRegistration.css'

class UserRegistration extends Component {
    constructor (props) {
        super(props)
        this.state = this.getInitialize()
    }    

    getInitialize = () => {
        return {
            loading: false,  
            form: {
                name: '',
                password: '',
                email: '',
                fone: ''
            }
        }
    }

    clearState = () => {
        console.log('this.stateInitial',this.getInitialize())
        this.setState(this.getInitialize())
    }

    setName = (event) => {
        let forms = this.state.form
        const {value} = event.target
        forms.name =  value

        this.setState({form:forms})
    }

    setPassword = (event) => {
        let forms = this.state.form
        const {value} = event.target
        forms.password =  value
        
        this.setState({form: forms})
    }

    setEmail = (event) => {
        let forms = this.state.form
        const {value} = event.target
        forms.email = value
        this.setState({form: forms})
    }

    setFone = (event) => {
        let forms = this.state.form
        const {value} = event.target
        forms.fone = value
        this.setState({form: forms})
    }

    submit = () => {
        this.setState({loading: true})
        Actions.createUser({
            name: this.state.form.name,
            email: this.state.form.email,
            password: this.state.form.password,
            phone: this.state.form.fone
        })
        .then((r) => {
            const email = this.state.form.email
            this.setState({loading: false})
            this.clearState()

            this.props.history.push({
                pathname: '/',
                param: {
                    email: email
                }
            })
        }).catch((e) => {
            this.setState({loading: false})
        })
    }

    back = () => {
        this.clearState()
        this.props.history.goBack()
    }

    render () {
        return (
            <Fragment>
                <Loader loading={this.state.loading}/>
                <Container className="UserRegistration">
                    <h1 className="title">Cadastro de Usuário</h1>
                    <Row>
                        <Col md="">
                            <InputGroup className="">
                                <FormControl
                                    placeholder="Nome"
                                    aria-label="Nome"
                                    aria-describedby="name"
                                    value={this.state.form.name}
                                    onChange={this.setName}
                            />
                            </InputGroup> 
                        </Col>
                        <Col>
                            <InputGroup className="">
                                <FormControl
                                    placeholder="Senha"
                                    aria-label="Senha"
                                    aria-describedby="senha "
                                    type="password"
                                    value={this.state.form.password}
                                    onChange={this.setPassword}
                                />
                            </InputGroup>
                        </Col>
                    </Row>    

                    <Row >    
                        <Col>
                            <InputGroup className="mt-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="email">@</InputGroup.Text>
                            </InputGroup.Prepend>
                                <FormControl
                                placeholder="Email"
                                aria-label="Emial"
                                aria-describedby="email"
                                value={this.state.form.email}
                                onChange={this.setEmail}
                                />
                            </InputGroup>
                        </Col>
                        <Col>
                            <InputGroup className="mt-3">
                                <FormControl
                                placeholder="(__) 9 9999-9999"
                                aria-label="Fone"
                                aria-describedby="fone"
                                value={this.state.form.fone}
                                onChange={this.setFone}
                                />
                            </InputGroup>
                        </Col>    
                        
                        <Button variant="dark" type="button" className="mt-3 mr-3 ml-3 float-right" onClick={this.submit}>
                            Criar conta
                        </Button>


                        <Button variant="link" type="button" className="mt-3 mr-3 ml-3 float-right" onClick={this.back}>
                            Cancelar
                        </Button>
                    </Row>
                </Container>
            </Fragment>
        );
    }

}

export default UserRegistration
