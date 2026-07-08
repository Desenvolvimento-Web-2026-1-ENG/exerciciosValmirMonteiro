import http from 'http';
import { Agenda } from './agenda';

const PORTA: number = 3000;

const agenda: Agenda = new Agenda();
agenda.adicionarContato({ nome: "Valmir" }, { numero: "1234-5678" });
agenda.adicionarContato({ nome: "Monteiro" }, { numero: "9876-5432" });

const servidor = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    res.setHeader('Content-Type', 'application/json');

    if(req.url === "/api/status" && req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify({ 
            status: "Online",
            mensagem: "Meu primeiro servidor Node.js funciona!"
        }));
        
    } else if(req.url === "/api/contatos" && req.method === "GET") {
        res.writeHead(200);
        res.end(JSON.stringify(agenda.listarContatos()));

    } else if (req.url === "/api/novo" && req.method === "POST") {
        if (req.headers['content-type'] === 'application/json') {
            let body = '';
            req.on('data', (chunk: Buffer) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const novoContato = JSON.parse(body);
                const pessoa = { nome: novoContato.pessoa.nome, sobrenome: novoContato.pessoa.sobrenome };
                const telefone = { numero: novoContato.telefone.numero, ddd: novoContato.telefone.ddd };
                agenda.adicionarContato(pessoa, telefone);
                res.writeHead(201);
                res.end(JSON.stringify({ mensagem: "Contato adicionado com sucesso!" }));
            });
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({
            erro: "Rota não encontrada!"
        }));
    }
});

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`);
});

