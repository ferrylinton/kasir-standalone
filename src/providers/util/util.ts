
import { Injectable } from '@angular/core';
import { Base } from '../../models/base.model';
import { Sort } from '../../models/sort.model';


@Injectable()
export class UtilProvider {

  transactionNumber(): string {
    return new Date().valueOf() + '-' + Math.floor((Math.random() * 10000) + 10000);
  }

  randomString(length: number): string{
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  randomNumber(start: number, end:number): number{
    return Math.floor(Math.random() * end) + start;
  }
  
  filterObject(arr: Array<Base>, field: string, keyword: string): Array<Base>{
    return arr.filter((data) => {
      return (data[field].toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    })
  }

  filterByDate(arr: Array<Base>, field: string, date: Date): Array<Base>{
    return arr.filter((data) => {
      if(data[field]){
        return (date.getFullYear() === data[field].getFullYear() 
        && date.getMonth() === data[field].getMonth() 
        && date.getDate() === data[field].getDate());
      }
      
    })
  }

  filterBetweenDate(arr: Array<Base>, field: string, start: Date, end: Date): Array<Base>{
    return arr.filter((data) => {
      let date1 = new Date(start.getTime());
      let date2 = new Date(end.getTime());
      let date3 = new Date(data[field]);
      date1.setHours(0, 0, 0, 0);
      date2.setHours(0, 0, 0, 0);
      date3.setHours(0, 0, 0, 0);

      return date3 >= date1 && date3 <= date2;
    })
  }

  sortStringAsc(arr: Array<string>): Array<string> {
    return arr.sort(function (a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortStringDesc(arr: Array<string>): Array<string> {
    return arr.sort(function (a, b) {
      if (a > b) {
        return -1;
      } else if (a < b) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortObject(arr: Array<Base>, sort: Sort): Array<Base>{
    if(sort.isAsc){
      return this.sortObjectAsc(arr, sort.column);
    }else{
      return this.sortObjectDesc(arr, sort.column);
    }
  }

  sortObjectAsc(arr: Array<Base>, field: string): Array<Base> {
    return arr.sort(function (a, b) {
      let val1 = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      let val2 = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];

      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  sortObjectDesc(arr: Array<Base>, field: string): Array<Base> {
    return arr.sort(function (a, b) {
      let val1 = typeof a[field] === 'string' ? a[field].toLowerCase() : a[field];
      let val2 = typeof b[field] === 'string' ? b[field].toLowerCase() : b[field];

      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    });
  }

}
