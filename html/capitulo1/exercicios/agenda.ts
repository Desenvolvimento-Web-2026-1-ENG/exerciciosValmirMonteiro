interface Pessoa {
    nome: string;
    sobrenome?: string; // só pra não deixar uma interface de uma propriedade só
}

interface Telefone {
    telefone: string;
    ddd?: string; // só pra não deixar uma interface de uma propriedade só
}

interface Contato {
    pessoa: Pessoa;
    telefone: Telefone;
}

class Agenda {

    contatos: Contato[];

    constructor() {
        this.contatos = [];
    }


    adicionarContato(pessoa: Pessoa, telefone: Telefone): void {
        const novoContato: Contato = { pessoa, telefone };
        this.contatos.push(novoContato);
        console.log(`Contato adicionado: ${novoContato.pessoa.nome} - ${novoContato.telefone.telefone}`);
    }

    listarContatos(): void {
        console.log("Contatos na agenda:");
        this.contatos.forEach((contato) => {
            console.log(`${contato.pessoa.nome} - ${contato.telefone.telefone}`);
        });
    }

    buscarContato(nome: string): void {
        const contatoEncontrado : Contato | undefined = this.contatos.find(contato => contato.pessoa.nome === nome);
        if (contatoEncontrado) {
            console.log(`Contato encontrado: ${contatoEncontrado.pessoa.nome} - ${contatoEncontrado.telefone.telefone}`);
        } else {
            console.log(`Contato com o nome "${nome}" não encontrado.`);
        }
    }
}

const agenda = new Agenda();
agenda.adicionarContato({ nome: "Valmir" }, { telefone: "1234-5678" });
agenda.adicionarContato({ nome: "Monteiro" }, { telefone: "9876-5432" });
agenda.listarContatos();
agenda.buscarContato("Valmir");
agenda.buscarContato("Junior");