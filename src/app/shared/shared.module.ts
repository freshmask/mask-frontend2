import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonCurrencyRpPipe } from './pipes/common-currency-rp.pipe';



@NgModule({
  declarations: [CommonCurrencyRpPipe],
  exports: [
    CommonCurrencyRpPipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
