import React, { useEffect, useState } from "react";
import {
  DeleteQuarto,
  GetQuartoById,
  GetQuartos,
  PostQuarto,
  PutQuarto,
} from "../../../services/serviceQuarto";
import "../Quarto/quarto.css";
import Table from "../../commons/table/table";

const Quarto = () => {
  const [alterar, setAlterar] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Salvar");
  const [listaQuartos, setListaQuartos] = useState([]);
  const [quartos, setquartos] = useState([]);
  const [salvou, setSalvou] = useState(false);
  const [habilitar, setHabilitar] = useState(true);

  const columns = [
    { name: "Numero", columnType: "texto" },
    { name: "Tipo", columnType: "texto" },
    { name: "Preco", columnType: "texto" },
    { name: "Status", columnType: "texto" },
  ];

  const dataSource =
    listaQuartos &&
    listaQuartos?.map((item) => [
      { name: item.Numero },
      { name: item.Tipo },
      { name: item.Preco },
      { name: item.Status },
      {
        botoes: [
          {
            botao: (
              <button
                onClick={() => CarregarQuarto(item)}
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
                onClick={() => ExcluirQuarto(item.QuartoId)}
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
    Quarto[event.target.id] = value;
    setquartos({ ...quartos });
    //console.log("evt", event, 'val', value);
  };

  const CarregarQuarto = (quarto) => {
    setquartos({});
    setAlterar(true);
  };

  const ExcluirQuarto = (id) => {
    DeleteQuarto(id).then((res) => {
      console.log(res.data);
    });
    setSalvou(true);
  };

  const handleSalvar = () => {
    if (alterar) {
      PutQuarto(quartos).then((res) => setSalvou(true));
    } else {
      PostQuarto(quartos).then((res) => setSalvou(true));
      setquartos({});
    }
  };

  const NovoQuarto = () => {
    setquartos({});
    setHabilitar(false);
  };

  useEffect(() => {
    GetQuartos().then((res) => setListaQuartos(res.data));
    setSalvou(false);
  }, [salvou]);

  useEffect(() => {
    setTextoBotao(alterar ? "Alterar" : "Salvar");
  }, [alterar]);

  return (
    <div style={{ marginLeft: "10px" }}>
      <div>
        <h2>Cadastro de Quartos</h2>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ padding: "10px" }} className="col-md">
            <label>Numero</label>
            <input
              readOnly={habilitar}
              type="text"
              id="Numero"
              value={quartos.Numero || ""}
              onChange={(e) => handleChange(e, e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div style={{ padding: "10px" }} className="col-md">
            <label>Tipo</label>
            <input
              readOnly={habilitar}
              type="text"
              id="Tipo"
              value={quartos.Tipo || ""}
              onChange={(e) => handleChange(e, e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div style={{ padding: "10px" }} className="col-md">
            <label>Preco</label>
            <input
              readOnly={habilitar}
              type="text"
              id="Preco"
              value={quartos.Preco || ""}
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
              value={quartos.Status || ""}
              onChange={(e) => handleChange(e, e.target.value)}
              className="form-control"
            ></input>
          </div>
        </div>
      </div>
      <button onClick={handleSalvar} type="button" className="btn-success">
        {textoBotao}
      </button>
      <button
        onClick={NovoQuarto}
        type="button"
        style={{ marginLeft: "5px" }}
        className="btn-primary"
      >
        Novo Quarto
      </button>
      <div>
        <Table dados={dataSource} columns={columns}></Table>
      </div>
    </div>
  );
};

export default Quarto;
