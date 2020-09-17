import React, { Component, Fragment } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import Loader from '../../component/Loader'
import './forgotPassword.css';

import Actions from "../../actions/Authenticate/Authenticate"

class forgotPassword extends Component {
  stateInitial = {
    title: 'Esqueceu senha',
    loading: false,
    tokenIsValid: false,
    form: {
      email: '',
      token: '',
      password: '',
      passwordConfirm: ''
    }
  }

  state = this.stateInitial

  clearState = () => {
    this.setState(this.stateInitial)
  }
  
  setEmail = (event) => {
    const {value} = event.target
    
    this.setState({ form: Object.assign(this.state.form ,{email: value})})
  }

  setToken = (event) => {
    const {value} = event.target
    this.setState({form: Object.assign(this.state.form ,{token: value})})

  }

  setNewPassword = (event) => {
    const {value} = event.target
    // this.setState({form:{password: value}})
    this.setState({form: Object.assign(this.state.form ,{password: value})})

  }

  setNewPasswordConfirm = (event) => {
    const {value} = event.target
    // this.setState({form:{passwordConfirm: value}})
    this.setState({form: Object.assign(this.state.form ,{passwordConfirm: value})})

  }

  submitToken = (event) => {
    this.setState({loading: true})
    
    Actions.requestForgotPassword({email: this.state.form.email})
    .then((r) => {
      this.setState({
        loading: false,
        tokenIsValid: true
      })
    })
    .catch((error) => {
      this.setState({loading: false})
    })
  }

  submitNewPassword = () => {
    this.setState({loading: true})
    Actions.resetPasswordUser({
      email: this.state.form.email,
      token : this.state.form.token,
      password : this.state.form.passwordConfirm,
    })
      .then((r) => {
        this.setState({loading: false})
        this.props.history.push({
          pathname: '/',
          param: {
              email: this.state.form.email
          }
        })
      })
      .catch((error) => {
        this.setState({loading: false})

      })
  }

  back = () => {
    // this.clearState()
    this.props.history.goBack()
  }

  render () {
    const tokenIsValid = this.state.tokenIsValid
    
    let template = 
    <Row>
      <Col>
        <label>Email para envio o token!</label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Email"
            aria-label="Email"
            aria-describedby="basic-addon1"
            value={this.state.form.email}
            onChange={this.setEmail}
          />
        </InputGroup>
        <Button variant="dark" type="button" onClick={this.submitToken}>
          Enviar
        </Button>
        
        <Button variant="link" type="button" className="" onClick={this.back}>
          Voltar
        </Button>
      </Col>
    </Row>
    
    if (tokenIsValid) {
      template = 
      <Row>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Token"
            aria-label="Toke"
            aria-describedby="basic-token"
            value={this.state.form.token}
            onChange={this.setToken}
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
                    placeholder="Nova senha"
                    aria-label="Nova senha"
                    aria-describedby="basic-addon1"
                    value={this.state.form.password}
                    onChange={this.setNewPassword}
                  />
        </InputGroup>
  
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Confirmar nova senha"
            aria-label="Confirmar nova senha"
            aria-describedby="basic-addon1"
            value={this.state.form.passwordConfirm}
            onChange={this.setNewPasswordConfirm}
          />
        </InputGroup>

        <Button variant="dark" type="button" onClick={this.submitNewPassword}>
          Trocar senha
        </Button>


        <Button variant="link" type="button" className="mt-3 mr-3 ml-3 float-right" onClick={() => {this.setState({tokenIsValid: false})}}>
          Cancelar
        </Button>
      </Row>
    }

    return (
      // <Table head={ this.state.head } body={ this.state.body } FuncDelete={this.delete} FuncEdit={this.edit} />
      <Fragment>
        <Loader loading={this.state.loading}/>
        <Container className="forgotPassword">
          <h1 class="title">{this.state.title}</h1>
          {template}
        </Container>
      </Fragment>
    );
  }
}

export default forgotPassword