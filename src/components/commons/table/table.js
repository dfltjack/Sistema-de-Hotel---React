import React from "react";

const Table = ({ dados = [], columns = [], className = "table table-striped" }) => {

    const CriarColunas = (columnType, value) => {
        switch (columnType) {
            case "texto":
                return value ? value.name : ""; // Verifica se value é definido antes de acessar .name
            case "botoes":
                return value && value.botoes ? (
                    value.botoes.map((item, idx) => (
                        <React.Fragment key={idx}>
                            {item.botao}
                        </React.Fragment>
                    ))
                ) : null;
            default:
                return null;
        }
    };

    return (
        <table className={className} id="tabela">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={column.name}>{column.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {dados.map((dado, index) => 
                    <tr key={`linha-${index}`}>
                        {columns.map((col, index) => 
                            <td> 
                                {dado[index] === null ? "" :
                                CriarColunas(col.columnType, dado[index])}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
