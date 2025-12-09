import { useEffect, useState } from "react";
import axios from "axios";

function ListarConsumo() {
  // 1. ESTADOS E VARIÁVEIS (DENTRO da função, mas ANTES do return)
  const [consumo, setConsumo] = useState<Consumo[]>([]);

  // 2. EFEITOS (useEffect)
  useEffect(() => {
    carregarConsumo(); // Chamada corrigida para o nome correto da função
  }, []);

  // 3. FUNÇÕES
  function carregarConsumo() {
    fetch("http://localhost:5117/api/consumo/listar")
      .then((resposta) => resposta.json())
      .then((consumo: Consumo[]) => {
        console.table(consumo);
        setConsumo(consumo);
      });
  }

  function alterar(id: string) {
  console.log(`Id: ${id}`);
  axios
  
    .put<Consumo[]>(`http://localhost:5117/api/consumo/alterar${id}`)
    .then((resposta) => {
    setConsumo(resposta.data);
    });

}

  // 4. RENDERIZAÇÃO (O que aparece na tela)
  return (
    <div>
      <h1>Listar Consumos</h1>
      <table border = {1}>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Peso</th>
            <th>classificação</th>
            <th>Criado em</th>
            <th>Alterar classificação</th>


          </tr>
        </thead>
        <tbody>
          {consumo.map((consumo) => (
            <tr key={consumo.consumoId}>
              <td>{consumo.consumoId}</td>
              <td>{consumo.consumo}</td>
              <td>{consumo.classificação}</td>
              <td>{consumo.nome}</td>
              <td>{consumo.criadoEm}</td>
              
              <td>
                <button onClick={() => 
                  alterar(consumo.consumoId!)}>
                  Alterar
                </button>
              </td> 
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListarConsumo;