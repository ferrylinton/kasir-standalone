import { Pipe } from '@angular/core';
import moment from 'moment';
import { DEFAULT_LANGUAGE } from '../constant/setting';

@Pipe({
  name: 'moment'
})
export class MomentPipe {

  private CalendarSpec : any = {
    "en": {
      sameDay: '[Today] ( DD-MM-YYYY )',
      nextDay: '[Tomorrow] ( DD-MM-YYYY )',
      nextWeek: 'dddd',
      lastDay: '[Yesterday] ( DD-MM-YYYY )',
      lastWeek: '[Last] dddd ( DD-MM-YYYY )',
      sameElse: 'DD-MM-YYYY'
    },
    "id":{
      sameDay: '[Hari ini] ( DD-MM-YYYY )',
      nextDay: '[Besok] ( DD-MM-YYYY )',
      nextWeek: 'dddd [depan] ( DD-MM-YYYY )',
      lastDay: '[Kemarin] ( DD-MM-YYYY )',
      lastWeek: 'dddd [kemarin] ( DD-MM-YYYY )',
      sameElse: 'DD-MM-YYYY'
    }
  }

  transform(value, type, language) {
    type = type || '';
    language = language || DEFAULT_LANGUAGE;
    moment.locale(language);

    if(type === 'ago'){
      return moment(value).fromNow();
    }else if(type === 'cal'){
      return moment(value).calendar(null, this.CalendarSpec[language]);
    }else{
      return moment(value).format(type);
    }
  }
}
