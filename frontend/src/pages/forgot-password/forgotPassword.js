import React, {useState} from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

import './forgotPassword.css';

export default function forgotPassword () {
    const state = {
      count: 0
    }

    return (
      <Container>
        <h1 class="title">Esqueceu senha</h1>
        <form action="" >
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Token"
                  aria-label="Token"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              <Button variant="dark" type="submit">
                Enviar
              </Button>
            </Col>
          </Row>  
        </form>
      </Container>
    );
}