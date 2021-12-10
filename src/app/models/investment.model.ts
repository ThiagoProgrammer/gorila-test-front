enum Type {
  'RENDA_FIXA',
  'RENDA_VARIAVEL',
}
export class Investment {
  id?: number;
  type?: Type;
  items?: any[];
  value?: number;
  date?: string;
  totalRendaFixa?: number;
  totalRendaVariavel?: number;
}
