import { NgModule } from '@angular/core';

import { MomentPipe } from './moment.pipe';
import { ShortenStringPipe } from './shorten.pipe';
import { CurrencyPipe } from './currency.pipe';
import { DatetimePipe } from './datetime.pipe';

export const pipes = [
  MomentPipe,
  ShortenStringPipe,
  CurrencyPipe,
  DatetimePipe
];

@NgModule({
  declarations:[pipes],
  exports: [pipes]
})

export class PipesModule { }
