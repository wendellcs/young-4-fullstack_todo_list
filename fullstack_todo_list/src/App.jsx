
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [titulo, setTitulo] = useState("");

  const API = "http://localhost:3000/tarefas";

  // Buscar tarefas da API
  async function buscarTarefas() {
    const resposta = await fetch(API);
    const dados = await resposta.json();

    setTarefas(dados);
  }

  // Executar quando o componente carregar
  useEffect(() => {
    buscarTarefas();
  }, []);

  // Cadastrar tarefa
  async function adicionarTarefa(e) {
    e.preventDefault();

    if (!titulo.trim()) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });

    setTitulo("");
    buscarTarefas();
  }

  // Concluir tarefa
  async function concluirTarefa(id) {
    await fetch(`${API}/${id}`, {
      method: "PATCH",
    });

    buscarTarefas();
  }

  // Excluir tarefa
  async function excluirTarefa(id) {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    buscarTarefas();
  }

  return (
    <div className="container">
      <h1>Minhas Tarefas</h1>
      <p>Organize suas atividades!</p>

      <form onSubmit={adicionarTarefa}>
        <input
          type="text"
          placeholder="Digite uma tarefa..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>

      <div className="lista">
        {tarefas.map((tarefa) => (
          <div className="tarefa" key={tarefa.id}>
            <span
              className={tarefa.concluida ? "concluida" : ""}
            >
              {tarefa.titulo}
            </span>

            <div className="acoes">
              <button
                onClick={() => concluirTarefa(tarefa.id)}
              >
                {tarefa.concluida ? "Desfazer" : "Concluir"}
              </button>

              <button
                className="excluir"
                onClick={() => excluirTarefa(tarefa.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="contador">
        Total de tarefas: {tarefas.length}
      </p>
    </div>
  );
}

export default App;
