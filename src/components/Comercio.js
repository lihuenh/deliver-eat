import React from "react";
import { Container } from "react-bootstrap";

export default function Comercio() {
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <h1>Esto es la página de Comercios.</h1>
        </div>
      </Container>
    </>
  );
}
