import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { GrUndo } from "react-icons/gr";
import { useFormik } from "formik";
import * as Yup from "yup";

import Loader from "../../component/Loader";
import InputImage from "../../component/InputImage";
import { getDataOfUser, getIdOfUser } from "../../helper/UserUtilis.js";
import ActionsUserEdition from "../../actions/UserRegistration/UserRegistration";

import "./UserEdition.css";

export default function UserEdition() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [id, setIdOfUser] = useState(parseInt(getIdOfUser()));

  const validationSchema = Yup.object({
    name: Yup.string().required("O nome é obrigatório"),
    email: Yup.string().email("Insira um e-mail válido").required("O email é obrigatório"),
    password: Yup.string().min(6, "No mínimo 6 caracteres").required("A senha é obrigatória"),
    password_confirm: Yup.string().oneOf([Yup.ref("password"), null], "A senha não corresponde").required("Confirmação de senha é obrigatória"),
    phone: Yup.string().min(11, "No mínimo 11 caracteres").required("O telefone é obrigatória"),
  });

  const submit = async values => {
      const { name, email, password, phone } = values;

      try {
        setLoading(true);
        await ActionsUserEdition.editUser({
          id, name, email, password, phone
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
  };

  useEffect(() => {
    async function getDataUser() {
      try {
        const data = await ActionsUserEdition.getUserById(id);
        setDataUser(data);
      } catch (error) {
        alert("Ocorreu um erro", error);
      }
    }
    getDataUser();
  }, []);

  const formik = useFormik({
    initialValues: {
        name: dataUser.name,
        email: dataUser.email,
        password: '',
        password_confirm: '',
        phone: dataUser.phone,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: submit
  });

  return (
    <Fragment>
      <form
        onSubmit={formik.handleSubmit} 
        className={!formik.isValid ? 'not-valid' : ''}
        autoComplete="off"
      >
        <Container>
          <Loader loading={loading} />
          <p className="title">Edição de Usuário</p>
          <Row>
            <Col md="6">
              <input
                type="text"
                placeholder="Nome"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name 
                ? <div className="feed-back-error-input">{formik.errors.name}</div>
                :''
              }
            </Col>
            <Col md="6">
              <input
                placeholder="Email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email 
                ? <div className="feed-back-error-input">{formik.errors.email}</div>
                :''
              }
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <input
                placeholder="Senha"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password 
                ? <div className="feed-back-error-input">{formik.errors.password}</div>
                :''
              }
            </Col>
            <Col md="6">
              <input
                placeholder="Confirmar senha"
                name="password_confirm"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password_confirm}
              />
              {formik.touched.password_confirm && formik.errors.password_confirm 
                ? <div className="feed-back-error-input">{formik.errors.password_confirm}</div>
                :''
              }
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <input
                placeholder="Fone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone 
                ? <div className="feed-back-error-input">{formik.errors.phone}</div>
                :''
              }
            </Col>
          </Row>
          <InputImage />
          <Row>
            <Col sm="6" md="6">
              <button type="submit" variant="dark">
                Atualizar conta
              </button>
            </Col>
            <Col sm="6" md="6">
              <button
                type="button"
                variant="link"
                className="float-right"
                onClick={() => {
                  history.goBack();
                }}
              >
                <GrUndo />
                Voltar
              </button>
            </Col>
          </Row>
        </Container>
      </form>
    </Fragment>
  );
}