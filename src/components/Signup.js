import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "../images/icono_01.png";
import { Brand, Brand2, ButtonLogin } from "./navbar/NavbarElements";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/home");
    } catch (error) {
      setError("Failed to create an account.");
    }
    setLoading(false);
  }

  return (
    <>
      <div style={{ backgroundColor: "#5e60ce" }}>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ marginBottom: "120px", paddingTop: "80px" }}
        >
          <img src={logo} alt="logo" style={{ height: "110px" }} />
          <Brand2>DeliverEat</Brand2>
        </div>
        <Container
          className="d-flex justify-content-center"
          style={{ minHeight: "63vh" }}
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Card>
              <Card.Body>
                <h2 className="text-center mb-4">Registrarse</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="email"
                      ref={emailRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Constraseña</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="password"
                      ref={passwordRef}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Confirmar contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      required
                    />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="w-100  btn-dark"
                    type="submit"
                    style={{ marginTop: "15px" }}
                  >
                    Registrarse
                  </Button>
                  {error && (
                    <Alert
                      style={{ marginTop: "15px", marginBottom: 0 }}
                      variant="danger "
                    >
                      {error}
                    </Alert>
                  )}
                </Form>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Necesitas una cuenta?{" "}
              <Link to="/login" style={{ color: "#fff" }}>
                Iniciar sesion
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
