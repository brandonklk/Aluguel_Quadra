import React, { Fragment , useState } from "react";
import { useHistory } from "react-router-dom"
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useFormik } from 'formik'
import * as Yup from 'yup'

import './login.css';
import Footer from "../../component/Footer";
import Loader from '../../component/Loader';
import logoImg from '../../assets/logo.png';

import Actions from "../../actions/Authenticate/Authenticate";
import { login, saveUser } from "../../services/auth";



const Login = (props) => {
  const {param} = props.location
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    email: param && param.email || '',
    password: ''
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Insira um e-mail válido').required('O email é obrigatório'),
    password: Yup.string().min(6, 'No mínimo 6 caracteres').required('A senha é obrigatória')
  })

  const onSubmit = values => {
    Actions.authenticate(values)
      .then((r) => {
        const user = r.user[0]
        delete r.user.passwordHash
        
        setLoading(false)
        login(user.id)
        saveUser(JSON.stringify(user))
        
        history.push({
          pathname: '/Dashboard',
          param: {
            user: r.user
          }
        })

      }).catch((error) => {
        setLoading(false)
        setError(error)
      })
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });

  const goViewForgotPassword = () => {
    history.push('/forgot-password')
  }

  return (
    <Fragment>

      <form onSubmit={formik.handleSubmit} className={!formik.isValid ? 'not-valid' : ''} autocomplete="off">
        <Loader loading={loading}/>
        <Container>
          <Alert/>
          <Row className="justify-content-md-center">
            <Col xl="6">
            <img src={logoImg} alt="Logo quadra" className="img-logo" width="150" height="150"/>
              <h1 className="title">Login</h1>
              
              {error && <Alert variant="danger">{error}</Alert>} 

              <input type="text"
                    placeholder="Email"  
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email 
                ? <div className="feed-back-error-input">{formik.errors.email}</div>
                :''
              }

              <input type="password"  
                    className="mt-2" 
                    placeholder="Senha" 
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password 
                ? <div className="feed-back-error-input">{formik.errors.password}</div>
                :''
              }
              
              <button variant="dark" className="mt-4 full" type="submit">Entrar</button>
              <button variant="link" className="mt-4 full" type="button" onClick={goViewForgotPassword}>Esqueceu a senha?</button>            
              <button variant="mostarda" align-item="center" className="mt-4 full" size="sm" type="button" onClick={() => {history.push('/UserRegistration')}}>Criar Nova Conta</button>
            </Col>
          </Row>
        </Container>
      </form>
    </Fragment>
  )
  
}

export default Login