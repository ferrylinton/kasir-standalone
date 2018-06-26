import { Pipe } from '@angular/core';
import moment from 'moment';
import { DEFAULT_LANGUAGE } from '../constant/setting';

@Pipe({
  name: 'moment'
})
export class MomentPipe {

  private CalendarSpec : any = {
    "en": {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD-MM-YYYY'
    },
    "id":{
      sameDay: '[Hari ini]',
      nextDay: '[Besok]',
      nextWeek: 'dddd [depan]',
      lastDay: '[Kemarin]',
      lastWeek: 'dddd [kemarin]',
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
