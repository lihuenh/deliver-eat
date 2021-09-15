import { Container, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "./auth";
import { Link, useHistory } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Map } from "./Map";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";

export default function LoQueSea() {
  // const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const { user, logout } = useAuth();
  const history = useHistory();
  const [status, setStatus] = useState(1);
  const [statusRecepcion, setStatusRecepcion] = useState(1);
  const [titularTarjeta, setTitularTarjeta] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [expiracion, setExpiracion] = useState("");
  const [cvc, setCVC] = useState("");
  const [productPhoto, setPhoto] = useState(
    "https://images-na.ssl-images-amazon.com/images/I/11Pl7si+xBL._SX331_BO1,204,203,200_.jpg"
  );
  const [date, setDate] = useState(new Date());
  const [horaDesde, setHoraDesde] = useState("");
  const [horaHasta, setHoraHasta] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // State modal
  const [show, setShow] = useState(false);

  // handler del modal
  const handleClose = () => {
    setShow(false);
    history.push("/home");
  };
  const handleShow = () => setShow(true);

  const handlerDate = (date) => {
    const today = new Date();

    if (today > date) {
      setDate(today);
    } else {
      setDate(date);
    }
  };

  const onSubmit = () => {
    handleShow();
  };

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
          <Form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                <label htmlFor="descripcion" className="form-label">
                  Descripción
                </label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  cols="30"
                  rows="5"
                  type="text"
                  {...register("descripcion", {
                    required: "Descripcion del producto requerido.",
                    maxLength: {
                      value: 50,
                      message:
                        "La descripción no debe pasar los 50 caracteres.",
                    },
                  })}
                ></textarea>
                {errors.descripcion && (
                  <small className="text-danger">
                    {errors.descripcion.message}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="imagen" className="form-label">
                  Imagen
                </label>
                <div id="imagen" className="mb-3  d-flex">
                  <img
                    src={productPhoto}
                    style={{
                      height: "200px",
                      borderRadius: "8px",
                    }}
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
                  {...register("direccion", {
                    required: "Dirección del comercio requerido.",
                  })}
                />

                {errors.direccion && (
                  <small className="text-danger">
                    {errors.direccion.message}
                  </small>
                )}
              </div>
              <div className="mt-3">
                <Map />
                <div id="map"></div>
              </div>
            </div>
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
                    id="direccion-entrega"
                    className="form-control"
                    placeholder="Av. Colón"
                    {...register("calle", {
                      required: "Dirección de entrega requerida.",
                    })}
                  />
                  {errors.calle && (
                    <small className="text-danger">
                      {errors.calle.message}
                    </small>
                  )}
                </div>
                <div style={{ width: "20%", marginRight: "15px" }}>
                  <label htmlFor="numero" className="form-label">
                    Numero
                  </label>
                  <input
                    type="number"
                    id="numero"
                    className="form-control"
                    placeholder="5000"
                    {...register("numero", {
                      required: "Número requerido.",
                    })}
                  />
                  {errors.numero && (
                    <small className="text-danger">
                      {errors.numero.message}
                    </small>
                  )}
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
                  id="ciudad"
                  aria-label="Default select example"
                  {...register("ciudad", {
                    required: "Ciudad requerida.",
                  })}
                >
                  <option value=""></option>
                  <option value="1">Carlos Paz</option>
                  <option value="2">Córdoba</option>
                  <option value="3">Rio Primero</option>
                </select>
                {errors.ciudad && (
                  <small className="text-danger">{errors.ciudad.message}</small>
                )}
              </div>
              <div className="mb-3">
                <Map />
              </div>

              <div className="w-100 mb-3">
                <label htmlFor="referencia" className="form-label">
                  Referencia adicionales para la entrega
                </label>
                <textarea
                  className="form-control"
                  id="referencia"
                  cols="30"
                  rows="5"
                  {...register("referencia", {
                    maxLength: {
                      value: 50,
                      message:
                        "La descripción no debe pasar los 50 caracteres.",
                    },
                  })}
                ></textarea>
                {errors.referencia && (
                  <small className="text-danger">
                    {errors.referencia.message}
                  </small>
                )}
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                padding: "15px",
                border: "1px solid Gainsboro",
                borderRadius: "8px",
              }}
            >
              <h3>Paso 4: Fecha recepción del Pedido</h3>
              <hr style={{ color: "gray" }} />
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
                      onChange={(e) => radioHandlerRecepcion(1)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="tiempo-recepcion"
                    >
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
                      onChange={(e) => radioHandlerRecepcion(2)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="tiempo-recepcion"
                    >
                      Elegir Fecha y Hora
                    </label>
                  </div>
                  <div>
                    {statusRecepcion === 2 && (
                      <div className="d-flex">
                        <div style={{ width: "35%", marginRight: "15px" }}>
                          <label
                            className="form-label"
                            htmlFor="fechaRecepcion"
                          >
                            Fecha de Entrega
                          </label>
                          <DatePicker
                            selected={date}
                            onChange={(date) => handlerDate(date)}
                            dateFormat="dd/MM/yyyy"
                            className="form-control"
                            id="fechaRecepcion"
                          />
                        </div>
                        <div style={{ width: "30%", marginRight: "15px" }}>
                          <label className="form-label" htmlFor="horaDesde">
                            Rango Hora desde
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            id="horaDesde"
                            {...register("horaDesde", {
                              required: "Rango hora desde requerida.",
                            })}
                          />
                          {errors.horaDesde && (
                            <small className="text-danger">
                              {errors.horaDesde.message}
                            </small>
                          )}
                        </div>
                        <div style={{ width: "35%" }}>
                          <label className="form-label" htmlFor="horaHasta">
                            Rango Hora hasta
                          </label>
                          <input
                            type="time"
                            className="form-control"
                            id="horaHasta"
                            {...register("horaHasta", {
                              required: "Rango hora hasta requerida.",
                            })}
                          />
                          {errors.horaHasta && (
                            <small className="text-danger">
                              {errors.horaHasta.message}
                            </small>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                padding: "15px",
                border: "1px solid Gainsboro",
                borderRadius: "8px",
              }}
            >
              <h3>Paso 5: Datos de Pago</h3>
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
                <label
                  className="form-check-label"
                  htmlFor="tipo-pago"
                  type="checkbox"
                >
                  Tarjeta VISA
                </label>
              </div>
              <div className="">
                {status === 1 && (
                  <div>
                    <label htmlFor="importe" className="form-label">
                      Monto pago
                    </label>
                    <div className="input-group w-50" id="importe">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        {...register("monto", {
                          required: "Monto requerido.",
                        })}
                      />
                    </div>
                    {errors.monto && (
                      <small className="text-danger">
                        {errors.monto.message}
                      </small>
                    )}
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
                        {...register("titularTarjeta", {
                          required: "Nombre y apellido del titular requerido.",
                        })}
                      />
                      {errors.titularTarjeta && (
                        <small className="text-danger">
                          {errors.titularTarjeta.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="numeroTarjeta" className="form-label">
                        Numero Tarjeta
                      </label>
                      <input
                        type="text"
                        id="numeroTarjeta"
                        className="form-control w-50"
                        placeholder="4XXX XXXX XXXX XXXX"
                        {...register("numeroTarjeta", {
                          required: "Número de tarjeta requerida.",
                          maxLength: {
                            value: 16,
                            message: "Número de tarjeta inválido.",
                          },
                          minLength: {
                            value: 13,
                            message: "Número de tarjeta inválido.",
                          },
                          pattern: {
                            value: /^4[0-9]{12,16}$/,
                            message: "Debe ingresar tarjeta VISA.",
                          },
                        })}
                      />
                      {errors.numeroTarjeta && (
                        <small className="text-danger">
                          {errors.numeroTarjeta.message}
                        </small>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="fechaExpiracion" className="form-label">
                        Fecha de expiracion
                      </label>
                      <input
                        type="text"
                        id="fechaExpiracion"
                        className="form-control w-25"
                        placeholder="MM/AA"
                        {...register("fechaExpiracion", {
                          required: "Fecha de expiración requerida.",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                            message: "Formato inválido.",
                          },
                        })}
                      />
                      {errors.fechaExpiracion && (
                        <small className="text-danger">
                          {errors.fechaExpiracion.message}
                        </small>
                      )}
                    </div>
                    <div className="">
                      <label htmlFor="cvc" className="form-label">
                        CVC
                      </label>
                      <input
                        type="number"
                        id="cvc"
                        placeholder="NNN"
                        className="form-control w-25"
                        {...register("cvc", {
                          required: "CVC requerido.",
                          maxLength: {
                            value: 3,
                            message: "Debe ingresar un número de tres dígitos.",
                          },
                          minLength: {
                            value: 3,
                            message: "Debe ingresar un número de tres dígitos.",
                          },
                        })}
                      />
                      {errors.cvc && (
                        <small className="text-danger">
                          {errors.cvc.message}
                        </small>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Button
              disabled={loading}
              className="w-100 btn btn-success"
              type="submit"
              // onClick={handlerSubmit}
            >
              Generar pedido
            </Button>
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
                  Tu pedido ha sido generado con éxito!!
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
