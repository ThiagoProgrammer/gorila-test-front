import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brl',
})
export class BrlPipe implements PipeTransform {
  transform(price: any, args?: any): any {
    if (price) {
      return `R$ ${price.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    } else {
      return `R$ 0,00`;
    }
  }
}
