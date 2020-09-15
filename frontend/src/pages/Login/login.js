import { Container, Button, Alert } from 'react-bootstrap';
import './login.css';
import Loader from '../../component/Loader'
import logoImg from '../../assets/logo.png';
import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = this.getInitialize(props)
  }   
  
  getInitialize = (props) => {
    const state = {
      loading: false,
      email: "",
      password: "",
      error: ""
    }

    const {param} = props.location 
    if (param) {
      if(param.email) {
        state.email = param.email
      }
    }

    return state
  }

  handleLogin = async e => {
    e.preventDefault();
    this.setState({loading: true})
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/authenticate", { email, password });
        login(response.data.token);
        
        this.setState({loading: false})
        this.props.history.push("/Dashboard");
      } catch (err) {
        this.setState({
          error:
            "Ocorreu um problema com o login, verifique as informações de e-mail e senha."
        });
        this.setState({loading: false})
      }
    }
  };
  
  render() {
    return (
      <Container>
        <Loader loading={this.state.loading}/>
          <div className="login">
            <section className="form">
              <img src={logoImg} alt="Logo quadra"/>
              <form onSubmit={this.handleLogin}>
                {this.state.error && <Alert variant="danger">{this.state.error}</Alert>} 
                
                <h1 className="text_3">Faça seu login</h1>
                <input class="label" placeholder="Email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })}/>
                <input class="label mt-2" placeholder="Senha" type="password"  value={this.state.password} onChange={e => this.setState({ password: e.target.value })}/>
                
                <Button variant="secondary" className="button_1 mt-2" size="lg" type="submit">Entrar</Button>
                <Button variant="link" className="button_3" href={"forgot-password"} type="button" onClick={() => {this.props.history.push('/forgot-password')}}>Esqueceu a senha?</Button>            
                <Button align-item="center" variant="secondary" className="button_2" size="sm" type="button" onClick={() => {this.props.history.push('/UserRegistration')}}>Criar Nova Conta</Button>
              </form>
            </section>
          </div>
        </Container>
    );
  }
}

export default withRouter(Login);