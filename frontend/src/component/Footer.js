import React, { Fragment } from "react"
import { Container,Row, Col } from 'react-bootstrap'
import {GrGithub , GrMail, GrPhone} from 'react-icons/gr'

const Footer = (props) => {
    const style = {
      name: {

      },
      github: {
        'cursor':'pointer'
      },
      conteudo: {
        'textIndent': '1em'
      }
    }
    const arr_devs = [
      {name: 'Brandon', email: '', fone: '', github: 'brandonklk'},
      {name: 'Daniela', email: '', fone: '', github: 'dani-marioti'},
      {name: 'Dayan Freitas', email: 'dayan.freitas.df@gmail.com', fone: '(47) 9 9755-3390', github: 'Dayanfreitas'},
      {name: 'Israel', email: '', fone: '', github: 'israelmurilocadorin'},
      {name: 'Willian', email: '', fone: '', github: 'Zaanol'},
    ]
    return (
        <footer>
          <Container>
          <div><b>Colaboradores:</b></div>
            <Row>
              {
                arr_devs.map((i) => (
                  <Col key={i.name} className="mt-2" md="4">
                    <span style={style.name}><b>{i.name}</b></span>

                    <div>
                      {i.email ? <span><GrMail /> {i.email} <br/></span> : ''}
                      {i.fone ? <span><GrPhone/> {i.fone}<br/></span> : ''}
                      <span  style={style.github} onClick={() => {window.open(`https://github.com/${i.github}`, 'blank')}}><GrGithub/>{i.github}</span><br/>
                    </div>
                  </Col>
                ))
              }
            </Row>
          </Container>
          {/* <div>Desenvolvido por:</div> */}
        </footer>
    )
}

export default Footer