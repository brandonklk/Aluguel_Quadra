import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

import api from '../../services/api';

import './login.css';
import loginImg from '../../assets/login.png';
import logoImg from '../../assets/logo.png';

export default function Login(){

  function handleLogin(e){
    e.preventDefault();

  }

    return (
      <Container>
        <div className="login">
          <section className="form">
            <img src={logoImg} alt="Logo quadra"/>
            <form onSubmit={handleLogin}>
              <h1 className="text_3">Faça seu login</h1>
              <p><input class="label" placeholder="Email"/>
              <input class="label" placeholder="Senha"/></p>
              <Button variant="secondary" className="button_1" size="lg" type="submit">Entrar</Button>
              <Button variant="link" className="button_3">Esqueceu a senha?</Button>    
              <Button align-item="center" variant="secondary" className="button_2" size="sm" type="submit">Criar Nova Conta</Button>
            </form>
          </section>
        </div>
      </Container>
    );
}