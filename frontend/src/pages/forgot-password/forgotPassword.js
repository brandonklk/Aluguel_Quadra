import React, { Component, Fragment } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import Table from '../../component/Table'
import Loader from '../../component/Loader'
import './forgotPassword.css';

class forgotPassword extends Component {
  stateInitial = {
    title: 'Esqueceu senha',
    loading: false,
    tokenIsValid: false,
    form: {
      token: null,
      password: null,
      passwordConfirm: null
    }
  }

  state = this.stateInitial

  clearState = () => {
    this.setState(this.stateInitial)
  }
  
  setToken = (event) => {
    const {value} = event.target
    this.setState({form:{token: value}})
  }

  setNewPassword = (event) => {
    const {value} = event.target
    this.setState({form:{password: value}})
  }

  setNewPasswordConfirm = (event) => {
    const {value} = event.target
    this.setState({form:{passwordConfirm: value}})
  }

  submitToken = (event) => {
    this.setState({loading: true})
    
    this.validTokenRequest()
      .then(() => {
        this.setState({
          loading: false,
          tokenIsValid: true
        })
      })
      .catch(() => {
        this.setState({loading: false})
      })
  }

  submitNewPassword = () => {
    this.setState({loading: true})

    this.validPasswordRequest()
      .then(() => {
        this.setState({loading: false})
     
      })
      .catch(() => {
        this.setState({loading: false})
      })
  }

  /**
   * Execulta requisição para validar o Token 
   */
  validTokenRequest = () => {
    // TODO: execultar requisição para o back end de validação de token
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      },1000)
    })
  }

  /**
   * Execulta requisição para validar nova senha 
   */
  validPasswordRequest = () => {
    // TODO: execultar requisição para o back end de nova senha 
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true)
      },1000)
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
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Token"
            aria-label="Token"
            aria-describedby="basic-addon1"
            value={this.state.form.token}
            onChange={this.setToken}
          />
        </InputGroup>
        <Button variant="dark" type="button" onClick={this.submitToken}>
          Validar Token
        </Button>
        
        <Button variant="link" type="button" className="mt-3 mr-3 ml-3 float-right" onClick={this.back}>
          Voltar
        </Button>
      </Col>
    </Row>
    
    if (tokenIsValid) {
      template = 
      <Row>
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