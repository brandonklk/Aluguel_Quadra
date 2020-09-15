import { Container, Button } from 'react-bootstrap';
import './login.css';
import logoImg from '../../assets/logo.png';
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import { login } from "../../services/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Ocorreu um problema com o login, verifique as informações de e-mail e senha."
        });
      }
    }
  };

  render() {
    return (
      <Container>
          <div className="login">
            <section className="form">
              <img src={logoImg} alt="Logo quadra"/>
              <form onSubmit={this.handleLogin}>
              {this.state.error && <p>{this.state.error}</p>}
                <h1 className="text_3">Faça seu login</h1>
                <p><input class="label" placeholder="Email" onChange={e => this.setState({ email: e.target.value })}/>
                <input class="label" placeholder="Senha" onChange={e => this.setState({ password: e.target.value })}/></p>
                <Button variant="secondary" className="button_1" size="lg" type="submit">Entrar</Button>
                <Button variant="link" className="button_3" href={"forgotPassword.js"} >Esqueceu a senha?</Button>    
                <Button align-item="center" variant="secondary" className="button_2" size="sm" type="submit">Criar Nova Conta</Button>
              </form>
            </section>
          </div>
        </Container>
    );
  }
}

export default withRouter(Login);