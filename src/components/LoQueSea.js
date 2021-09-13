import { Container, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Map } from "./Map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Wizard, useWizard } from "react-use-wizard";

export default function LoQueSea() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { user, logout } = useAuth();
  const history = useHistory();
  const [status, setStatus] = useState(1);
  const [statusRecepcion, setStatusRecepcion] = useState(1);
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvc, setCVC] = useState("");
  const [titularTarjeta, setTitularTarjeta] = useState("");
  const [productPhoto, setPhoto] = useState(
    "https://images-na.ssl-images-amazon.com/images/I/11Pl7si+xBL._SX331_BO1,204,203,200_.jpg"
  );
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const radioHandler = (status) => {
    setStatus(status);
  };

  const radioHandlerRecepcion = (status) => {
    setStatusRecepcion(status);
  };

  function imageHandler(e) {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPhoto(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  // function initAutocomplete() {
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     center: { lat: -33.8688, lng: 151.2195 },
  //     zoom: 13,
  //     mapTypeId: "roadmap",
  //   });
  //   // Create the search box and link it to the UI element.
  //   const input = document.getElementById("pac-input");
  //   const searchBox = new google.maps.places.SearchBox(input);

  //   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  //   // Bias the SearchBox results towards current map's viewport.
  //   map.addListener("bounds_changed", () => {
  //     searchBox.setBounds(map.getBounds());
  //   });

  //   let markers = [];

  //   // Listen for the event fired when the user selects a prediction and retrieve
  //   // more details for that place.
  //   searchBox.addListener("places_changed", () => {
  //     const places = searchBox.getPlaces();

  //     if (places.length == 0) {
  //       return;
  //     }

  //     // Clear out the old markers.
  //     markers.forEach((marker) => {
  //       marker.setMap(null);
  //     });
  //     markers = [];

  //     // For each place, get the icon, name and location.
  //     const bounds = new google.maps.LatLngBounds();

  //     places.forEach((place) => {
  //       if (!place.geometry || !place.geometry.location) {
  //         console.log("Returned place contains no geometry");
  //         return;
  //       }

  //       const icon = {
  //         url: place.icon,
  //         size: new google.maps.Size(71, 71),
  //         origin: new google.maps.Point(0, 0),
  //         anchor: new google.maps.Point(17, 34),
  //         scaledSize: new google.maps.Size(25, 25),
  //       };

  //       // Create a marker for each place.
  //       markers.push(
  //         new google.maps.Marker({
  //           map,
  //           icon,
  //           title: place.name,
  //           position: place.geometry.location,
  //         })
  //       );
  //       if (place.geometry.viewport) {
  //         // Only geocodes have viewport.
  //         bounds.union(place.geometry.viewport);
  //       } else {
  //         bounds.extend(place.geometry.location);
  //       }
  //     });
  //     map.fitBounds(bounds);
  //   });
  // }

  const Step1 = () => {
    const {
      isLoading,
      isLastStep,
      isFirstStep,
      activeStep,
      previousStep,
      nextStep,
      handleStep,
    } = useWizard();

    return (
      <>
        {isLoading && <p>loading...</p>}
        <div
          className="mb-3"
          style={{
            padding: "15px",
            border: "1px solid Gainsboro",
            borderRadius: "8px",
          }}
        >
          <h3>Paso 1: Datos del Pedido</h3>
          <hr style={{ color: "gray" }} />

          <div className="mb-3">
            <label htmlFor="descripcionPedido" className="form-label">
              Descripción
            </label>
            <textarea
              className="form-control"
              id="descripcionPedido"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Imagen
            </label>
            <div id="imagen" className="mb-3  d-flex">
              <img
                src={productPhoto}
                style={{ height: "200px" }}
                className="rounded float-start"
              ></img>
            </div>
          </div>
          <div className="d-flex w-100 ">
            <input
              type="file"
              name="image-upload"
              id="input-image"
              accept="image/*"
              onChange={imageHandler}
            />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-secondary"
            style={{ width: "50%" }}
            onClick={() => previousStep()}
            disabled={isFirstStep}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "20px", width: "50%" }}
            onClick={() => nextStep()}
          >
            Siguiente
          </button>
        </div>
        {/* <div className="d-flex">
          <div
            className="d-flex justify-content-end"
            style={{ width: "30%", marginRight: 0 }}
          >
            Anterior: {!isLastStep ? activeStep : ""}
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ width: "35%", marginRight: 0 }}
          >
            Actual: {activeStep + 1}
          </div>
          <div
            className="d-flex justify-content-start"
            style={{ width: "35%", marginRight: 0, paddingRight: "2%" }}
          >
            Siguiente : {!isLastStep ? activeStep + 2 : ""}
          </div>
        </div> */}
      </>
    );
  };

  const Step2 = () => {
    const {
      isLoading,
      isLastStep,
      isFirstStep,
      activeStep,
      previousStep,
      nextStep,
      handleStep,
    } = useWizard();

    return (
      <>
        {isLoading && <p>loading...</p>}
        <div
          className="mb-3"
          style={{
            padding: "15px",
            border: "1px solid Gainsboro",
            borderRadius: "8px",
          }}
        >
          <h3> Paso 2: Datos del Comercio</h3>
          <hr style={{ color: "gray" }} />
          <div className="">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              className="form-control"
              placeholder="Av. Colón 5000"
            />
          </div>
          <div className="mt-3">
            <Map />
            <div id="map"></div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-secondary"
            style={{ width: "50%" }}
            onClick={() => previousStep()}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "20px", width: "50%" }}
            onClick={() => nextStep()}
          >
            Siguiente
          </button>
        </div>
      </>
    );
  };
  const Step3 = () => {
    const {
      isLoading,
      isLastStep,
      isFirstStep,
      activeStep,
      previousStep,
      nextStep,
      handleStep,
    } = useWizard();
    return (
      <>
        <div
          className="mb-3"
          style={{
            padding: "15px",
            border: "1px solid Gainsboro",
            borderRadius: "8px",
          }}
        >
          <h3>Paso 3: Datos de Entrega</h3>
          <hr style={{ color: "gray" }} />
          <div className="mb-3 d-flex ">
            <div style={{ width: "60%", marginRight: "15px" }}>
              <label htmlFor="direccion" className="form-label">
                Calle
              </label>
              <input
                type="text"
                id="direccion"
                className="form-control"
                placeholder="Av. Colón"
              />
            </div>
            <div style={{ width: "20%", marginRight: "15px" }}>
              <label htmlFor="numero" className="form-label">
                Numero
              </label>
              <input
                type="text"
                id="numero"
                className="form-control"
                placeholder="5000"
              />
            </div>
            <div style={{ width: "20%" }}>
              <label htmlFor="piso" className="form-label">
                Piso
              </label>
              <input
                type="text"
                id="piso"
                className="form-control"
                placeholder="2B"
              />
            </div>
          </div>

          <div className="mb-3" style={{ width: "58%" }}>
            <label htmlFor="ciudad" className="form-label">
              Ciudad
            </label>
            <select
              className="form-select"
              id="cuidad"
              aria-label="Default select example"
            >
              <option value="1">Carlos Paz</option>
              <option value="2">Córdoba</option>
              <option value="3">Rio Primero</option>
            </select>
          </div>
          {/* <div className="mb-3"><Map /></div> */}
          <div className="w-100 mb-3">
            <label htmlFor="referencia" className="form-label">
              Referencia adicionales para la entrega
            </label>
            <textarea
              className="form-control"
              id="referencia"
              cols="30"
              rows="5"
            ></textarea>
          </div>
          <div className="w-100">
            <label htmlFor="tiempoRecepcion" className="form-label">
              Cuando desea recibir el producto
            </label>
            <hr style={{ color: "gray", marginTop: 0, width: "35%" }} />
            <div id="tiempoRecepcion">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="recepcion"
                  id="tiempo-recepcion"
                  checked={statusRecepcion === 1}
                  onClick={(e) => radioHandlerRecepcion(1)}
                />
                <label className="form-check-label" htmlFor="tiempo-recepcion">
                  Lo antes posible
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="recepcion"
                  id="tiempo-recepcion"
                  checked={statusRecepcion === 2}
                  onClick={(e) => radioHandlerRecepcion(2)}
                />
                <label className="form-check-label" htmlFor="tiempo-recepcion">
                  Elegir Fecha y Hora
                </label>
              </div>
              <div>
                {statusRecepcion === 2 && (
                  <div className="d-flex">
                    <div style={{ width: "35%", marginRight: "15px" }}>
                      <label className="form-label" htmlFor="tipo-recepcion">
                        Fecha de Entrega
                      </label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="form-control"
                        id="tipo-recepcion"
                      />
                    </div>
                    <div style={{ width: "30%", marginRight: "15px" }}>
                      <label className="form-label" htmlFor="tipo-recepcion">
                        Rango Hora desde
                      </label>
                      <input
                        type="text"
                        placeholder="09:00"
                        className="form-control"
                      />
                    </div>
                    <div style={{ width: "35%" }}>
                      <label className="form-label" htmlFor="tipo-recepcion">
                        Rango Hora hasta
                      </label>
                      <input
                        type="text"
                        placeholder="10:00"
                        className="form-control"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-secondary"
            style={{ width: "50%" }}
            onClick={() => previousStep()}
          >
            Anterior
          </button>
          <button
            className="btn btn-primary"
            style={{ marginLeft: "20px", width: "50%" }}
            onClick={() => nextStep()}
          >
            Siguiente
          </button>
        </div>
      </>
    );
  };
  const Step4 = () => {
    const {
      isLoading,
      isLastStep,
      isFirstStep,
      activeStep,
      previousStep,
      nextStep,
      handleStep,
    } = useWizard();
    return (
      <>
        <div
          className="mb-3"
          style={{
            padding: "15px",
            border: "1px solid Gainsboro",
            borderRadius: "8px",
          }}
        >
          <h3>Paso 4: Datos de Pago</h3>
          <hr style={{ color: "gray" }} />
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="pago"
              id="tipo-pago"
              checked={status === 1}
              onClick={(e) => radioHandler(1)}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Efectivo
            </label>
          </div>
          <div className="mb-3 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="pago"
              id="tipo-pago"
              checked={status === 2}
              onClick={(e) => radioHandler(2)}
            />
            <label className="form-check-label" htmlFor="tipo-pago">
              Tarjeta VISA
            </label>
          </div>
          <div className="mb-3">
            {status === 1 && (
              <div>
                <label htmlFor="importe" className="form-label">
                  Monto pago
                </label>
                <div className="input-group mb-3 w-50" id="importe">
                  <span className="input-group-text">$</span>
                  <input type="text" className="form-control" />
                  <span className="input-group-text">.00</span>
                </div>
              </div>
            )}
            {status === 2 && (
              <div>
                <div className="mb-3">
                  <label htmlFor="titularTarjeta" className="form-label">
                    Nombre titular
                  </label>
                  <input
                    type="text"
                    id="titularTarjeta"
                    className="form-control w-75"
                    placeholder="Nombre y Apellido"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="numeroTarjeta" className="form-label">
                    Numero Tarjeta
                  </label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    className="form-control w-50"
                    placeholder="45XX XXXX XXXX XXXX"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="expiracion" className="form-label">
                    Fecha de expiracion
                  </label>
                  <input
                    type="text"
                    id="expiracion"
                    className="form-control w-25"
                    placeholder="MM/AA"
                  />
                </div>
                <div className="">
                  <label htmlFor="cvc" className="form-label">
                    CVC
                  </label>
                  <input
                    type="text"
                    id="cvc"
                    placeholder="NNN"
                    className="form-control w-25"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            className="btn btn-secondary"
            style={{ width: "50%" }}
            onClick={() => previousStep()}
          >
            Anterior
          </button>
          <Button
            disabled={loading}
            className="btn btn-success"
            style={{ marginLeft: "20px", width: "50%" }}
            onClick={handleShow}
          >
            Generar pedido
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center"
        style={{ minHeight: "100vh", paddingTop: "15px", marginBottom: "8vh" }}
      >
        <div className="w-100" style={{ maxWidth: "900px" }}>
          <h1 className="d-flex align-items-center justify-content-center">
            Pedí lo que sea, nosotros lo llevamos.
          </h1>
          <hr style={{ color: "gray" }} />
          <Form>
            <Wizard>
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
            </Wizard>
          </Form>
          <Modal
            show={show}
            onHide={handleClose}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header style={{ backgroundColor: "#146C43" }}>
              <Modal.Title
                id="contained-modal-title-vcenter"
                style={{ color: "#fff" }}
              >
                Éxito
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "100px" }}
              >
                <h4 className="d-flex align-items-center justify-content-center">
                  Tu pedido ha sido generado!!
                </h4>
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center ">
              <Button variant="success" onClick={handleClose}>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Container>
    </>
  );
}
