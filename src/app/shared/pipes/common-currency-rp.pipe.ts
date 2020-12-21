import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commonCurrencyRp'
})
export class CommonCurrencyRpPipe implements PipeTransform {

  transform(value: number): string{
    const batas = value.toLocaleString();
    const commaToDot = batas.replace(/,/g,'.');
    const result = 'Rp. ' + commaToDot + ',00';
    return result;
  }

}
