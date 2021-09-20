/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { NativeDateAdapter } from '@angular/material/core';

export class MyDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      const dateArray = date.toDateString().split(' ');

      const today = new Date(Date.now());
      const dateTodayArray = today.toDateString().split(' ');
      if (
        dateTodayArray[1] === dateArray[1] &&
        dateTodayArray[2] === dateArray[2] &&
        dateTodayArray[3] === dateArray[3]
      ) {
        return 'Heute';
      }
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // eslint-disable-next-line prefer-template
      return ('00' + day).slice(-2) + '/' + ('00' + month).slice(-2) + '/' + year;
    }
    return date.toDateString();
  }
}
