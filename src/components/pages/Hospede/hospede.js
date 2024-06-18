import React, { useEffect, useState } from "react";
import {  DeleteHospede,  GetHospedeById,  GetHospedes,  PostHospede,  PutHospede,} from "../../../services/serviceHospede";
import "../Hospede/hospede.css";
import Table from "../../commons/table/table";

const Hospede = () => {
  const [alterar, setAlterar] = useState(false);
  const [textoBotao, setTextoBotao] = useState("Salvar");
  const [listaHospedes, setListaHospedes] = useState([]);
  const [hospedes, setHospedes] = useState([]);
  const [salvou, setSalvou] = useState(false);
  const [habilitar, setHabilitar] = useState(true);

  const columns = [
    { name: "Nome", columnType: "texto" },
    { name: "Email", columnType: "texto" },
    { name: "Telefone", columnType: "texto" },
    { name: "DocumentoIdentificacao", columnType: "texto" },
  ];

  const dataSource =
    listaHospedes &&
    listaHospedes?.map((item) => [
      { name: item.Nome },
      { name: item.Email },
      { name: item.Telefone },
      { name: item.DocumentoIdentificacao },
      {
        botoes: [
          {
            botao: (
              <button
                onClick={() => CarregarHospede(item)}
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
                onClick={() => ExcluirHospede(item.HopedeId)}
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
    Hospede[event.target.id] = value;
    setHospedes({ ...hospedes });
    //console.log("evt", event, 'val', value);
  };

  const handleSalvar = () => {
    if (alterar) {
      PutHospede(hospedes).then((res) => setSalvou(true));
    } else {
      PostHospede(hospedes).then((res) => setSalvou(true));
      setHospedes({});
    }
  };

  const NovoHospede = () => {
    setHospedes({});
    setHabilitar(false);
  };

  const CarregarHospede = (item) => {
    setHospedes({});
    setAlterar(true);
  };

  const ExcluirHospede = (id) => {
    DeleteHospede(id).then((res) => {
      console.log(res.data);
    });
    setSalvou(true);
  };

  useEffect(() => {
    GetHospedes().then((res) => setListaHospedes(res.data));
    setSalvou(false);
  }, [salvou]);

  useEffect(() => {
    setTextoBotao(alterar ? "Alterar" : "Salvar");
  }, [alterar]);

  return (
    <div style={{ marginLeft: "10px" }}>
      <div>
        <h2>Cadastro de Hóspedes</h2>
      </div>
      <div>
        <div style={{ display: "flex" }}>
          <div style={{ padding: "10px" }} className="col-md">
            <label>Nome</label>
            <input
              readOnly={habilitar}
              type="text"
              id="Nome"
              value={hospedes.Nome || ""}
              onChange={(e) => handleChange(e, e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              readOnly={habilitar}
              type="email"
              id="Email"
              value={hospedes.Email || ""}
              onChange={(e) => handleChange(e, e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div>
            <label>Telefone</label>
            <input
              readOnly={habilitar}
              type="text"
              id="Telefone"
              value={hospedes.Telefone || ""}
              onChange={(e) => handleChange(e, e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div>
            <label>Documento Identificação</label>
            <input
              readOnly={habilitar}
              type="text"
              id="DocumentoIdentificacao"
              value={hospedes.DocumentoIdentificacao || ""}
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
        onClick={NovoHospede}
        type="button"
        style={{ marginLeft: "5px" }}
        className="btn-primary"
      >
        Novo Hóspede
      </button>
      <div>
        
        <Table dados={dataSource} columns={columns}></Table>
      </div>
    </div>
    
  );
};

export default Hospede;
