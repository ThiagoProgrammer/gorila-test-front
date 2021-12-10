import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage',
})
export class PercentagePipe implements PipeTransform {
  transform(num: any, ...args: any[]): any {
    if (args[0] === 'addPlus') {
      if (num > 0) {
        return `+${parseFloat(num)
          .toFixed(1)
          .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}%`.replace(
          '.',
          ','
        );
      } else {
        return `${parseFloat(num)
          .toFixed(1)
          .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}%`.replace(
          '.',
          ','
        );
      }
    }
    return `${parseFloat(num)
      .toFixed(1)
      .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1')}%`.replace('.', ',');
  }
}
