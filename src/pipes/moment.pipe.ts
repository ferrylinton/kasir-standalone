import { Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe {
  transform(value, type, language) {
    type = type || '';
    moment.locale(language);
    return type === 'ago' ? moment(value).fromNow() : moment(value).format(type);
  }
}
