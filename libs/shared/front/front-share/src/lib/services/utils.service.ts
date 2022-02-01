import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { DatePipe } from '@angular/common';

import momentImported from 'moment-timezone';
const moment = momentImported;

export const MsFormatDate = 'dd-MM-yyyy';
export const MsFormatDateTime = 'dd-MM-yyyy hh:mm';
export const MsFormatMonthDate = 'MM-yyyy';
export const MsFormatYearDate = 'yyyy';

@Injectable({
  providedIn: 'root'
})

export class UtilsService {

  constructor(public datepipe: DatePipe) { }

  displayDuration(startDate: Date, endDate: Date) {
    try {
      const difference = moment(new Date(endDate)).diff(moment(new Date(startDate)));
      const duration = moment.duration(difference).locale('fr').humanize();
      return duration;
    } catch {
      console.error('displayItemDuration creation error');
    }
  }

  getDateWithTime(d: Date, t: string) {
    let date = moment(d),
      time = moment(t, 'HH:mm');
    date.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second')
    });
    return date.toDate();
  }

  getTimeFromDate(d: Date) {
    return moment(d, 'HH:mm').format('HH:mm');
  }

  getStartDayOfMonth(d: Date) {
    return moment(new Date(d), MsFormatDate).startOf('month').toDate();
  }

  getEndDayOfMonth(d: Date) {
    return moment(new Date(d), MsFormatDate).endOf('month').toDate();
  }

  getStartDayOfYear(d: Date) {
    return moment(new Date(d), MsFormatDate).startOf('year').toDate();
  }

  getEndDayOfYear(d: Date) {
    return moment(new Date(d), MsFormatDate).endOf('year').toDate();
  }


  nextXDayDate(d: Date,x:number):Date{
    return moment(new Date(d), MsFormatDate).day(x).toDate();
    //return moment(d).add(x, 'd').toDate();
  }

  nextXYearDate(d: Date,x:number):Date{
    return moment(d).add(x, 'y').toDate();
  }

  getTotalDaysOfMonth(d: Date) :number{
    return moment(new Date(d), MsFormatDate).daysInMonth();
  }

  getDayOfWeek(d: Date){
    return moment(new Date(d), MsFormatDate).isoWeekday();
  }

  getLastWeekDay(firstDateOfCurrWeek: Date): number {
    let totalDays = this.getTotalDaysOfMonth(firstDateOfCurrWeek);
    let currDay = firstDateOfCurrWeek.getDate();
    let defRes = 7;
    if ((totalDays - currDay) < 6 && (totalDays - currDay)>0) {
      defRes= totalDays - currDay + 1;
    }
    return defRes;
  }

  compareDateDay(dateTimeA: Date, dateTimeB: Date): boolean {
    var momentA = moment(new Date(dateTimeA), MsFormatDate);
    var momentB = moment(new Date(dateTimeB), MsFormatDate);
    return momentA.isSame(momentB, 'day');
  }

  compareDateMonth(dateTimeA: Date, dateTimeB: Date): boolean {
    var momentA = moment(new Date(dateTimeA), MsFormatDate);
    var momentB = moment(new Date(dateTimeB), MsFormatDate);
    return momentA.isSame(momentB, 'month');
  }

  compareDateYear(dateTimeA: Date, dateTimeB: Date): boolean {
    var momentA = moment(new Date(dateTimeA), MsFormatDate);
    var momentB = moment(new Date(dateTimeB), MsFormatDate);
    return momentA.isSame(momentB, 'year');
  }

  compareDateBetween(date: Date, dateTimeA: Date, dateTimeB: Date): boolean {
    var momentD = moment(new Date(date), MsFormatDate);
    var momentA = moment(new Date(dateTimeA), MsFormatDate);
    var momentB = moment(new Date(dateTimeB), MsFormatDate);
    return momentD.isBetween(momentA,momentB);
  }

  isSameOrAfter(dateTimeA: Date, dateTimeB: Date): boolean {
    var momentA = moment(new Date(dateTimeA), MsFormatDate);
    var momentB = moment(new Date(dateTimeB), MsFormatDate);
    return momentA.isSameOrAfter(momentB, 'day');
  }

  isSameOrBefore(dateTimeA: Date, dateTimeB: Date): boolean {
    var momentA = moment(new Date(dateTimeA), MsFormatDate);
    var momentB = moment(new Date(dateTimeB), MsFormatDate);
    return momentA.isSameOrBefore(momentB, 'day');
  }

  formatDateMonth(d: Date): string {
    return this.datepipe.transform(d, MsFormatMonthDate);
  }

  formatDateDay(d: Date): string {
    return this.datepipe.transform(d, MsFormatDate);
  }
  
  formatDateYear(d: Date): string {
    return this.datepipe.transform(d, MsFormatYearDate);
  }

  /** find occurence by item in object example:
   * getItemOccurences(lits,'param1','param2',...)
   * check in list[i].pram1.param2 ...
  */
  // getItemOccurences(items: any[], ...params): ItemOccurence<string>[] {
  //   const itemsOccurences: ItemOccurence<string>[] = [];
  //   if (items) {
  //     for (let i = 0; i < items.length; i++) {
  //       const cthec = this.getObjectsProp(items[i], params);
  //       const index = itemsOccurences.findIndex(tc => tc.item === cthec);
  //       if (index >= 0) {
  //         itemsOccurences[index].occurence = itemsOccurences[index].occurence + 1;
  //       } else {
  //         itemsOccurences.push({ item: cthec, occurence: 1 });
  //       }
  //     }
  //   }
  //   return itemsOccurences;
  // }

  getObjectsProp(object: any, params) {
    const first = this.getProp(object, params[0]);
    let next = first;
    for (let i = 1; i < params.length; i++) {
      next = this.getProp(next, params[i]);
    }
    return next;
  }

  getProp(obj: {}, key: string) {
    return obj[key];
  }

  getEnumItems(enumT: any) {
    // const arr: [] = [];
    // for (const item in enumT) {
    //   if (isNaN(Number(item))) {
    //     arr.push({name : item });
    //   }
    // }
    // return arr;
  }


  convertObservableToBehaviorSubject<T>(observable: Observable<T>, initValue: T): BehaviorSubject<T> {
    const subject = new BehaviorSubject(initValue);
    observable.subscribe({
      complete: () => subject.complete(),
      error: x => subject.error(x),
      next: x => subject.next(x)
    });
    return subject;
  }

}
