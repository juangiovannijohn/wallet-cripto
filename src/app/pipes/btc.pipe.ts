import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'BTC'
})
export class BTCPipe implements PipeTransform {

  transform(value: number,
    currencySign: string = 'BTC ',
    decimalLength: number = 18, 
    chunkDelimiter: string = '.', 
    decimalDelimiter:string = ',',
    chunkLength: number = 3): string {
    
    let result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
    let num = value.toFixed(decimalLength);

    return currencySign+(decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter);
}

}
