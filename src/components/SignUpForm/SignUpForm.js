import React, { useState } from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { values, size } from "lodash";
import { toast } from "react-toastify";
import { isEmailValid } from "../../utils/validations";
import { signUpApi } from "../../api/auth";
import "./SignUpForm.scss";

export default function SignUpForm(props) {
  const { setShowModal } = props;
  const [formData, setFormData] = useState(initialFormValue());
  const [signUpLoading, setSignUpLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);

    let validCount = 0;
    values(formData).some((value) => {
      value && validCount++;
      return null;
    });
    //console.log(validCount);

    if (validCount !== size(formData)) {
      toast.warning("Completa todos los campos del formulario");
    } else {
      if (!isEmailValid(formData.email)) {
        toast.warning("Email invalido");
      } else if (formData.password !== formData.repeatPassword) {
        toast.warning("Las contraseñas tienen que ser iguales.");
      } else if (size(formData.password) < 6) {
        toast.warning("La contraseña tiene que tener al menos 6 caracteres");
      } else {
        setSignUpLoading(true);
        signUpApi(formData)
          .then((response) => {
            if (response.code) {
              toast.warning(response.message);
            } else {
              toast.success("El registro ha sido correcto");
              setShowModal(false);
              setFormData(initialFormValue());
            }
          })
          .catch(() => {
            toast.error("Error del servidor, inténtelo más tarde!");
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      }
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-form">
      <h2>Crea tu cuenta</h2>
      <Form onSubmit={onSubmit} onChange={onChange}>
        <div className="form-group">
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  defaultValue={formData.nombre}
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Apellidos"
                  name="apellido"
                  defaultValue={formData.apellido}
                  // onChange={(e) =>
                  //   setFormData({ ...formData, apellidos: e.target.value })
                  // }
                />
              </Col>
            </Row>
          </Form.Group>
        </div>

        <div className="form-group">
          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Correo electronico"
              name="email"
              defaultValue={formData.email}
            />
          </Form.Group>
        </div>

        <div className="form-group">
          <Form.Group>
            <Row>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  defaultValue={formData.password}
                />
              </Col>
              <Col>
                <Form.Control
                  type="password"
                  placeholder="Repetir contraseña"
                  name="repeatPassword"
                  defaultValue={formData.repeatPassword}
                />
              </Col>
            </Row>
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          {!signUpLoading ? "Registrarse" : <Spinner animation="border" />}
        </Button>
      </Form>
    </div>
  );
}

function initialFormValue() {
  return {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    repeatPassword: "",
  };
}
