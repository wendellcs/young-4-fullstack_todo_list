
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados temporário
let tarefas = [
  { id: 1, titulo: "Estudar JavaScript", concluida: false },
  { id: 2, titulo: "Aprender React", concluida: true },
];

// Listar todas as tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Cadastrar uma tarefa
app.post("/tarefas", (req, res) => {
  const { titulo } = req.body;

  if (!titulo) {
    return res.status(400).json({
      mensagem: "O título é obrigatório",
    });
  }

  const novaTarefa = {
    id: Date.now(),
    titulo,
    concluida: false,
  };

  tarefas.push(novaTarefa);

  console.log(tarefas)

  res.status(201).json(novaTarefa);
});

// Atualizar uma tarefa
app.patch("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const tarefa = tarefas.find((item) => item.id === id);

  if (!tarefa) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }

  tarefa.concluida = !tarefa.concluida;

  res.json(tarefa);
});

// Excluir uma tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = Number(req.params.id);

  const existe = tarefas.some((item) => item.id === id);

  if (!existe) {
    return res.status(404).json({
      mensagem: "Tarefa não encontrada",
    });
  }

  tarefas = tarefas.filter((item) => item.id !== id);

  res.json({
    mensagem: "Tarefa excluída com sucesso",
  });
});

// Inicializar servidor
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
