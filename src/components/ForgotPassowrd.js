import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "../images/icono_01.png";
import { Brand, Brand2, ButtonLogin } from "./navbar/NavbarElements";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions.");
    } catch (error) {
      setError("Failed to reset password.");
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
                <h2 className="text-center mb-4">Restablecer contraseña</h2>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Button
                    disabled={loading}
                    className="mb-3 w-100  btn-dark"
                    type="submit"
                    style={{ marginTop: "15px" }}
                  >
                    Confirmar
                  </Button>
                  {error && (
                    <Alert
                      style={{ marginTop: "15px", marginBottom: 0 }}
                      variant="danger "
                    >
                      {error}
                    </Alert>
                  )}
                  {message && (
                    <Alert
                      style={{ marginTop: "15px", marginBottom: 0 }}
                      variant="success"
                    >
                      {message}
                    </Alert>
                  )}
                </Form>
                <div className="w-100 text-center mt-3">
                  <Link to="/login" style={{ color: "#000" }}>
                    Iniciar sesión
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
              Nuevo en DeliverEat?{" "}
              <Link to="/signup" style={{ color: "#fff" }}>
                Crear una cuenta.
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
