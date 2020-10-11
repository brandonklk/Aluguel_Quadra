import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom"
import { Container, Row, Col } from 'react-bootstrap';
import { GrUndo } from 'react-icons/gr'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import Loader from '../../component/Loader'
import Actions from "../../actions/Authenticate/Authenticate"

import './forgotPassword.css';

const ForgotPassword = () => {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [tokenIsValid, setTokenIsValid] = useState(false);

  const initialValues = {
    email: '',
    token : '',
    password : '',
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Insira um e-mail válido').required('O email é obrigatório'),
    tokenIsValid: Yup.boolean(),
    token: Yup.string().when("tokenIsValid", {is: true, then: Yup.string().required('Token é obrigatório')}),
    password: Yup.string().when("tokenIsValid", {is: true, then: Yup.string().required('Nova senha é obrigatório')})
  })

  const onSubmit = values => {
    
    if (tokenIsValid) {
      submitNewPassword(values)
      return
    }
    
    setLoading(true)
    const {email} = values

    Actions.requestForgotPassword({email})
      .then((r) => {
        setLoading(false)
        setTokenIsValid(true)
        formik.values.tokenIsValid = true

      }).catch((e) => {
        setLoading(false)
      })

  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema
  });
  
  const back = () => {
    history.goBack()
  }

  const submitNewPassword = (values) => {
    setLoading(true)
    Actions.resetPasswordUser({
      email: values.email,
      token: values.token,
      password: values.password
    })
      .then((r) => {
        setLoading(false)
        history.push({
          pathname: '/',
          param: {
            email: values.email
          }
        })
      })
      .catch(setLoading(false))
  }

  return (
    <Fragment>
      <form onSubmit={formik.handleSubmit} className={!formik.isValid ? 'not-valid' : ''} autocomplete="off">
        <Container>
            <Loader loading={loading}/>
            <p className="title">
              {tokenIsValid ? 'Nova senha' : 'Esqueceu senha ?'}
            </p>
            <p>{tokenIsValid ? 'Digite a nova senha !' : 'Digite um email válido para envio do token !'}</p>
            <Row>
              <Col md="12">
                {
                  tokenIsValid ? 
                  <Fragment>
                    <input type="text" 
                      placeholder="Token"
                      name="token"
                      onChange={formik.handleChange}
                      value={formik.values.token}
                    />
                    {formik.touched.token && formik.errors.token 
                      ? <div className="feed-back-error-input">{formik.errors.token}</div>
                      :''
                    }
                    <input type="text" 
                      placeholder="Nova senha"
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password 
                      ? <div className="feed-back-error-input">{formik.errors.password}</div>
                      :''
                    }
                  </Fragment> :
                  <Fragment>
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
                  </Fragment>}

                  <button type="submit" variant="dark" className="mt-2">
                    Enviar token
                  </button>
                  <button type="button" variant="link"  className="float-right mt-2" onClick={back}>
                    <GrUndo/> Voltar
                  </button>
              </Col>
            </Row>
            
        </Container>
      </form>
    </Fragment>
  )
}
export default ForgotPassword