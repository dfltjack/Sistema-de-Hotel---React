import React from "react";

const Table = ({ dados = [], columns = [], className = "table table-striped" }) => {

    const CriarColunas = (columnType, value) => {
        switch (columnType) {
            case ("texto"):
                return value.name; 
                break;
            case ("botao"):
                var botoes = []
                value.botoes.map(item => {
                    botoes.unshift(item.botao)
                });                        
                return botoes;
                break;
        default:
            return null;
        }
    }

    return (
        <table className={className} id="tabela">
            <thead>
                <tr>
                    {
                        columns.map(column => 
                        <th key={column.name}>{column.name}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {dados.map((dados, index) => 
                    <tr key={`linha-${index}`}
                    >
                        {columns.map((col, index) => 
                            <td>                                
                                {dados[index] == null ? "" :
                                CriarColunas(col.columnType, dados[index])}
                            </td>
                        )}
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
