import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SettingProvider } from '../providers/setting/setting';

@Pipe({
  name: 'datetime',
  pure: false
})
export class DatetimePipe {

  formated: string = '';

  constructor(public settingProvider: SettingProvider) {
  }

  transform(value) {
    this.settingProvider.getSetting().subscribe(setting => {
      if (value && setting) {
        let pipe = new DatePipe(setting.language);
        this.formated = pipe.transform(value, setting.datetimeFormat);
      }
    })

    return this.formated;
  }
}
