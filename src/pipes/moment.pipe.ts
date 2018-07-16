import { Pipe } from '@angular/core';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'moment'
})
export class MomentPipe {

  formated: string = '';

  constructor(public translate: TranslateService) {
  }

  transform(value, type) {
    this.translate.get('CALENDAR').subscribe(CalendarSpec => {
      type = type || '';
      moment.locale(this.translate.currentLang);

      if (type === 'ago') {
        this.formated = moment(value).fromNow();
      } else if (type === 'cal') {
        this.formated = moment(value).calendar(null, CalendarSpec);
      } else {
        this.formated = moment(value).format(type);
      }
    });

    return this.formated;
  }
}
