import { Container } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const history = useHistory();

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100">
          <h1 className="d-flex justify-content-center">
            Bienvenido {user.email}
          </h1>
          {/* <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Profile</h2>
              {error && (
                <Alert
                  style={{ marginTop: "15px", marginBottom: 0 }}
                  variant="danger "
                >
                  {error}
                </Alert>
              )}
              <strong>Email: </strong>
              {user.email}
              <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                Update Profile
              </Link>
            </Card.Body>
          </Card> */}
        </div>
      </Container>
    </>
  );
}
