import express, { Request, Response } from "express";
import { Tarefa } from "./tarefa";

const tarefas: Tarefa[] = [];
let nextId = 1;

const tarefa1 = {
  id: nextId++,
  titulo: "Estudar TypeScript",
  descricao: "Aprender os conceitos básicos do TypeScript.",
  concluida: false
};

const tarefa2 = {
  id: nextId++,
  titulo: "Estudar Express.js",
  descricao: "Criar uma API RESTful usando Express.js.",
  concluida: false
};

tarefas.push(tarefa1);
tarefas.push(tarefa2);

const PORTA = 3000;

const app = express();

app.use(express.json());

app.get('/api/tarefas', (req: Request, res: Response) => {
  res.status(200).json(tarefas);
});

app.get('/api/tarefas/:id', (req: Request, res: Response) => {
  const  id = req.params.id;
  const tarefa = tarefas.find(t => String(t.id) === id);

  if (!tarefa) {
    return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
  }

  res.status(200).json(tarefa);
});

app.post('/api/tarefas', (req: Request, res: Response) => {
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;

  if (!titulo) {
    return res.status(400).json({ mensagem: 'O título é obrigatório.' }); // Bad request
  }

  const novaTarefa: Tarefa = {
    id: nextId++,
    titulo,
    descricao,
    concluida: false
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

app.put('/api/tarefas/:id', (req: Request, res: Response) => {

  const  id = req.params.id;
  const titulo = req.body.titulo;
  const descricao = req.body.descricao;
  const concluida = req.body.concluida;

  const tarefaIndex = tarefas.findIndex(t => String(t.id) === id);

  if (tarefaIndex === -1) {
    return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
  }

  if(tarefas[tarefaIndex] === undefined) {
    return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
  }

  const tarefaAtualizada = tarefas[tarefaIndex];
  tarefaAtualizada.titulo = titulo ?? tarefaAtualizada.titulo;
  tarefaAtualizada.descricao = descricao ?? tarefaAtualizada.descricao;
  tarefaAtualizada.concluida = concluida ?? tarefaAtualizada.concluida;   

  res.status(200).json(tarefaAtualizada);
});

app.delete('/api/tarefas/:id', (req: Request, res: Response) => {
  const  id = req.params.id;
  const tarefaIndex = tarefas.findIndex(t => String(t.id) === id);

  if (tarefaIndex === -1) {
    return res.status(404).json({ mensagem: 'Tarefa não encontrada.' });
  }

  tarefas.splice(tarefaIndex, 1);
  res.status(204).send();
});

// Iniciando o servidor na porta definida
app.listen(PORTA, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORTA}`);
})