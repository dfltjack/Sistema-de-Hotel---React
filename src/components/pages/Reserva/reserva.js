import React, { useState, useEffect } from "react";
import {
  DeleteReserva,
  GetReservas,
  PostReserva,
  PutReserva,
  GetReservaById,
} from "../../../services/serviceReserva";
import "../Reserva/reserva.css";
import Table from "../../commons/table/table";

const Reserva = () => {
  const [alterar, setAlterar] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Salvar");
  const [listaReservas, setListaReservas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [salvou, setSalvou] = useState(false);
  const [habilitar, setHabilitar] = useState(true);

  const columns = [
    { name: "QuartoId", columnType: "Quarto" },
    { name: "HospedeId", columnType: "Hospede" },
    { name: "DataCheckin", columnType: "date" },
    { name: "DataCheckout", columnType: "date" },
    { name: "Status", columnType: "text" },
  ];

  const dataSource =
    listaReservas &&
    listaReservas?.map((item) => [
      { name: item.QuartoId },
      { name: item.HospedeId },
      { name: item.DataCheckin },
      { name: item.DataCheckout },
      { name: item.Status },
      {
        botoes: [
          {
            botao: (
              <button
                onClick={() => CarregarReserva(item)}
                style={{ marginLeft: "5px" }}
                className="btn btn-sm btn-primary"
                type="button"
              >
                Editar
              </button>
            ),
          },
          {
            botao: (
              <button
                onClick={() => ExcluirReserva(item.ReservaId)}
                className="btn btn-sm btn-danger"
                type="button"
              >
                Excluir
              </button>
            ),
          },
        ],
      },
    ]);

  const handleChange = (event, value) => {
    Reserva[event.target.id] = value;
    setReservas({ ...reservas });
  };

  const CarregarReserva = async (item) => {
    setReservas({});
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
    GetReservas().then((res) => setListaReservas(res.data));
    setSalvou(false);
  }, [salvou]);

  useEffect(() => {
    setTextoBotao(alterar ? "Alterar" : "Salvar");
  }, [alterar]);

  return (
    <div style={{ marginLeft: "10px" }}>
      <div>
        <h2>Cadastro de Quartos </h2>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ padding: "10px" }} className="col-md">
          <label>QuartoId</label>
          <input
            readOnly={habilitar}
            type="text"
            id="QuartoId"
            value={reservas.QuartoId || ""}
            onChange={(e) => handleChange(e, e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div style={{ padding: "10px" }} className="col-md">
          <label>HospedeId</label>
          <input
            readOnly={habilitar}
            type="text"
            id="HospedeId"
            value={reservas.HospedeId || ""}
            onChange={(e) => handleChange(e, e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div style={{ padding: "10px" }} className="col-md">
          <label>DataCheckin</label>
          <input
            readOnly={habilitar}
            type="date"
            id="DataCheckin"
            value={reservas.DataCheckin || ""}
            onChange={(e) => handleChange(e, e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div style={{ padding: "10px" }} className="col-md">
          <label>DataCheckout</label>
          <input
            readOnly={habilitar}
            type="date"
            id="DataCheckout"
            value={reservas.DataCheckout || ""}
            onChange={(e) => handleChange(e, e.target.value)}
            className="form-control"
          ></input>
        </div>
        <div style={{ padding: "10px" }} className="col-md">
          <label>Status</label>
          <input
            readOnly={habilitar}
            type="text"
            id="Status"
            value={reservas.Status || ""}
            onChange={(e) => handleChange(e, e.target.value)}
            className="form-control"
          ></input>
        </div>
        <button onClick={handleSalvar} type="button" className="btn-success">
          {textoBotao}
        </button>
        <button
          onClick={NovaReserva}
          type="button"
          style={{ marginLeft: "5px" }}
          className="btn-primary"
        >
          Nova Reserva
        </button>
        <div>
          <Table dados={dataSource} columns={columns}></Table>
        </div>
      </div>
    </div>
  );
};

export default Reserva;