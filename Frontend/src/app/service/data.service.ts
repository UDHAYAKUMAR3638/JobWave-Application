import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
