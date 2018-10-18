import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  constructor() { }

  context;

  getContext() {
    return this.context;
  }

  setContext(context) {
    this.context = context;
  }

  formatDate(date) {
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return (
      year +
      '-' +
      (monthIndex < 9 ? '0' + (monthIndex + 1) : monthIndex + 1) +
      '-' +
      (day < 10 ? '0' + day : day)
    );
  }

  getToday() {
    const now = new Date();
    return this.formatDate(now);
  }

  getFiveDayAgo() {
    const now = new Date();
    return this.formatDate(new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000));
  }

  adjustForTimezone(date: Date, utc = true): Date {
    // var timeOffsetInMS: number = (new Date()).getTimezoneOffset() * 60000;
    // if (utc) {
    //   date.setTime(date.getTime() + timeOffsetInMS); // adding, idealy it should subtract
    // } else {
    //   date.setTime(date.getTime() - timeOffsetInMS); // subtrating, idealy it should add
    // }
    return date;
  }

}
