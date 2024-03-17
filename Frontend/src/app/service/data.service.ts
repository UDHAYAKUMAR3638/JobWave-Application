import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Page {
  content: any[],
  totalElements: number,
  totalPages: number,
  number: number,
  size: number,
  numberOfElements: number,
  hasNext: boolean,
  hasPrevious: boolean
}

@Injectable({
  providedIn: 'root',
})
export class DataService {

  messageSource = new BehaviorSubject('default message');

  constructor() { }

  changeMessage(data: string): void {
    this.messageSource.next(data);
  }
}
