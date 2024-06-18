import React, {useState} from "react";

const Table = ({dados = [], columns = [], className = "table table-stripped"}) => {
    
    const CriarColunas = (columnType, value) => {
        switch (columnType) {
            case("texto"):
                return value.name;
                break
            case ('botao'):
                var botoes = []
                value.botoes.map(item => {
                    botoes.unshift(item.botao)
                });
                return botoes;
                break;
            
        }
    }

    return (
        <table className={className} id="tabela">
            <thead>
                <tr>
                    {
                        columns.map(column => <th key={column.name}>{column.name}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    dados.map((dado, index) => 
                        <tr key={`linha-${index}`}
                        >
                            {
                                columns.map((col, index) =>
                                <td>
                                    {dado[index] == null ? "" : CriarColunas(col.columnType, dado[index])}
                                    
                                </td>
                                
                            )}
                        </tr>
                        
                        
                )}
            </tbody>
        </table>
    );
};

export default Table;