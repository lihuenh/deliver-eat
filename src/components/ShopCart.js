import { Container } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link, useHistory } from "react-router-dom";

export default function Home() {
  // const [error, setError] = useState("");
  // const { user, logout } = useAuth();
  // const history = useHistory();

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h1>SHOP CART.</h1>
        </div>
      </Container>
    </>
  );
}
