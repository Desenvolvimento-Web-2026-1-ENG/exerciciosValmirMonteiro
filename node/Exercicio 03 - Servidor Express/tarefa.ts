export interface Tarefa {
  id: number | string;
  titulo: string;
  descricao?: string;
  concluida: boolean;
}