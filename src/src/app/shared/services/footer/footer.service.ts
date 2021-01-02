
import { Injectable, Output, EventEmitter } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class footerService {
  @Output() hideFooter: EventEmitter<boolean> = new EventEmitter();
  constructor() { }
  hidefooter(bit) {
    console.log(bit)
    this.hideFooter.emit(bit);
    //false for SurveyMode
  }
}