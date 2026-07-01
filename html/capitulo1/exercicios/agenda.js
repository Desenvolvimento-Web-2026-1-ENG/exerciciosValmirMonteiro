/*
Construir uma Agenda de Contatos
Crie um arquivo chamado agenda.js. Neste arquivo, você deve criar uma classe chamada Agenda que atenda aos seguintes requisitos:
Armazenamento: A classe deve ter uma propriedade interna (um array) para guardar os contatos.
Adicionar Contato: Um método que receba nome e telefone e adicione esse novo contato à agenda.
Listar Contatos: Um método que imprima no console todos os contatos salvos, formatados de maneira legível.
Buscar Contato: Um método que receba um nome, procure na agenda e exiba o telefone correspondente (ou uma mensagem de erro se não encontrar).
*/

class Agenda {
    constructor() {
        this.contatos = [];
    }

    adicionarContato(nome, telefone) {
        const contato = { nome, telefone };
        this.contatos.push(contato);
        console.log(`Contato ${nome} adicionado com sucesso!`);
    }

    listarContatos() {
        if (this.contatos.length === 0) {
            console.log("Nenhum contato na agenda.");
            return;
        }
        console.log("Contatos na agenda:");
        this.contatos.forEach((contato, index) => {
            console.log(`${index + 1}. Nome: ${contato.nome}, Telefone: ${contato.telefone}`);
        });
    }

    buscarContato(nome) {
        const contato = this.contatos.find(c => c.nome.toLowerCase() === nome.toLowerCase());
        if (contato) {
            console.log(`Telefone de ${nome}: ${contato.telefone}`);
        } else {
            console.log(`Contato ${nome} não encontrado na agenda.`);
        }
    }
}

// Exemplo de uso da classe Agenda
const minhaAgenda = new Agenda();
minhaAgenda.adicionarContato("Valmir", "1234-5678");
minhaAgenda.adicionarContato("Monteiro", "9876-5432");
minhaAgenda.listarContatos();
minhaAgenda.buscarContato("Valmir");
minhaAgenda.buscarContato("Junior");   
