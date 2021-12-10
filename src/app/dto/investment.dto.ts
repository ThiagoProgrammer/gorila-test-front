enum Type {
  'RENDA_FIXA',
  'RENDA_VARIAVEL',
}
export class InvestmentsDTO {
  type?: Type;
  value?: number;
  date?: string;
  constructor(params: InvestmentsDTO) {
    Object.assign(this, params);
  }
}
