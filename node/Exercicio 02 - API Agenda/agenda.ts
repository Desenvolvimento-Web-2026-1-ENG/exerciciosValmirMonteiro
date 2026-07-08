interface Pessoa {
    nome: string;
    sobrenome?: string; // só pra não deixar uma interface de uma propriedade só
}

interface Telefone {
    numero: string;
    ddd?: string; // só pra não deixar uma interface de uma propriedade só
}

interface Contato {
    pessoa: Pessoa;
    telefone: Telefone;
}

export class Agenda {

    contatos: Contato[];

    constructor() {
        this.contatos = [];
    }


    adicionarContato(pessoa: Pessoa, telefone: Telefone): void {
        const novoContato: Contato = { pessoa, telefone };
        this.contatos.push(novoContato);
    }

    listarContatos(): Contato[] {
        return (this.contatos);
    }

    buscarContato(nome: string): void {
        const contatoEncontrado : Contato | undefined = this.contatos.find(contato => contato.pessoa.nome === nome);
        if (contatoEncontrado) {
            console.log(`Contato encontrado: ${contatoEncontrado.pessoa.nome} - ${contatoEncontrado.telefone.numero}`);
        } else {
            console.log(`Contato com o nome "${nome}" não encontrado.`);
        }
    }
}