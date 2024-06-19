import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import {
  DeleteReserva,
  GetReservas,
  PostReserva,
  PutReserva,
} from "../../../services/serviceReserva";
import Table from "../../commons/table/table";
import "../Reserva/reserva.css";

const Reserva = () => {
  const [alterar, setAlterar] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Salvar");
  const [listaReservas, setListaReservas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [salvou, setSalvou] = useState(false);
  const [habilitar, setHabilitar] = useState(true);

  const columns = [

    { name: "DataCheckin", columnType: "texto" },
    { name: "DataCheckout", columnType: "texto" },
    { name: "Status", columnType: "texto" },
    { name: "Ação", columnType: "botao" },
  ];

  const dataSource =
    listaReservas &&
    listaReservas.map((item) => [
   
      { name: item.dataCheckin },
      { name: item.dataCheckout },
      { name: item.status },
      {
        botoes: [
          {
            botao: (
              <Button
                onClick={() => CarregarReserva(item)}
                variant="primary"
                size="sm"
                style={{ marginLeft: "5px" }}
              >
                Editar
              </Button>
            ),
          },
          {
            botao: (
              <Button
                onClick={() => ExcluirReserva(item.ReservaId)}
                variant="danger"
                size="sm"
              >
                Excluir
              </Button>
            ),
          },
        ],
      },
    ]);

  const handleChange = (event, value) => {
    reservas[event.target.id] = value;
    setReservas({ ...reservas });
  };

  const CarregarReserva = (reservas) => {
    setReservas(reservas);
    setHabilitar(false);
    setAlterar(true);
  };

  const ExcluirReserva = (id) => {
    DeleteReserva(id).then((res) => {
      console.log(res.data);
    });
    setSalvou(true);
  };

  const handleSalvar = () => {
    if (alterar) {
      PutReserva(reservas).then((res) => setSalvou(true));
    } else {
      PostReserva(reservas).then((res) => setSalvou(true));
      setReservas({});
    }
  };

  const NovaReserva = () => {
    setReservas({});
    setHabilitar(false);
  };

  useEffect(() => {
    GetReservas().then((res) => {setListaReservas(res.data);console.log(res.data)});
    setSalvou(false);
  }, [salvou]);

  useEffect(() => {
    setTextoBotao(alterar ? "Alterar" : "Salvar");
  }, [alterar]);

  return (
    <Container style={{ marginTop: "20px" }}>
      <h2>Cadastro de Quartos</h2>
      <Form>
        <Row>
          <Col md={2}>
            <Form.Group controlId="QuartoId">
              <Form.Label>QuartoId</Form.Label>
              <Form.Control
                readOnly={habilitar}
                type="text"
                defaultValue={reservas.quartoId || ""}
                onChange={(e) => handleChange(e, e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="HospedeId">
              <Form.Label>HospedeId</Form.Label>
              <Form.Control
                readOnly={habilitar}
                type="text"
                defaultValue={reservas.hospedeId || ""}
                onChange={(e) => handleChange(e, e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="DataCheckin">
              <Form.Label>DataCheckin</Form.Label>
              <Form.Control
                readOnly={habilitar}
                type="date"
                defaultValue={reservas.dataCheckin || ""}
                onChange={(e) => handleChange(e, e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="DataCheckout">
              <Form.Label>DataCheckout</Form.Label>
              <Form.Control
                readOnly={habilitar}
                type="date"
                defaultValue={reservas.dataCheckout || ""}
                onChange={(e) => handleChange(e, e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="Status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                readOnly={habilitar}
                type="text"
                defaultValue={reservas.status || ""}
                onChange={(e) => handleChange(e, e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="success" onClick={handleSalvar}>
              {textoBotao}
            </Button>
            <Button
              variant="primary"
              onClick={NovaReserva}
              style={{ marginLeft: "5px" }}
            >
              Nova Reserva
            </Button>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "20px" }}>
        <Table dados={dataSource} columns={columns} />
      </div>
    </Container>
  );
};

export default Reserva;
