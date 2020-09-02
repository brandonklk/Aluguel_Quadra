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
              <h1>Faça seu login</h1>
              <input placeholder="Seu ID"/>
              <Button variant="secondary" className="button" type="submit">OK</Button>        
            </form>
          </section>
          <img src={loginImg} alt="Aluguel de Quadras" />
        </div>
      </Container>
    );
}