enum Type {
  'RENDA_FIXA',
  'RENDA_VARIAVEL',
}
export class Investment {
  id?: number;
  type?: Type;
  value?: number;
  date?: string;
}
