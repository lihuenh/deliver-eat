import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

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
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Passowrd Reset</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  type="submit"
                  style={{ marginTop: "15px" }}
                >
                  Confirm
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
                <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </Container>
    </>
  );
}
