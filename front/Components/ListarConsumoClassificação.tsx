import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CadastrarConsumoAgua() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [peso, setPeso] = useState("");
  const [classificado, setClassificado] = useState("");


  function CadastrarConsumoAgua(e: any) {
    e.preventDefault();

    const consumo: Consumo = {
      nome: nome,
      peso: peso,
      classificado: classificado
    };

     // 2. EFEITOS (useEffect)
  useEffect(() => {
    CadastrarConsumoAgua(); // Chamada corrigida para o nome correto da função
  }, []);

    fetch("http://localhost:5117/api/consumo/listarporstatus/Baixo%20consumo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(consumo),
    })
      .then((resposta) => resposta.json())
      .then((dados) => {
        console.log(dados);
        navigate("/pages/consumo/listarClassificação");
      });
  }

  // O return TEM QUE estar dentro da função CadastrarConsumo
  return (
    <div>
      <h1>Cadastrar Consumo</h1>
      <form onSubmit={CadastrarConsumoAgua}>
        <label><Nome></Nome>:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <label>Peso:</label>
        <input
          type="text"
          placeholder="Digite peso"
          onChange={(e: any) => setPeso(e.target.value)}
        />
        <br />
        <label>Classificado:</label>
        <select onChange={(e: any) => setClassificado(e.target.value)} required>
          <option value="">Selecione uma classificação</option>
          {classificado.map((classificado) => (
            <option
              value={consumo.Id}
              key={consumo.categoriaId}
            >
              {consumo.nome}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
} // <--- A chave que fecha a função fica SÓ AQUI

export default CadastrarConsumoAgua;