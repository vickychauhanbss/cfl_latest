import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MessageService {
    @Output() change: EventEmitter<boolean> = new EventEmitter();
   

    constructor() { }
    login(msg) {
      this.change.emit(msg);
    }

}

// import { Injectable, Output, EventEmitter } from '@angular/core'
// @Injectable({
//  providedIn: 'root'
// })
// export class HeaderService {
//  @Output() change: EventEmitter<boolean> = new EventEmitter();
//  constructor() { }
//  login() {
//    this.change.emit(false);
//    // false for SurveyMode
//  }
// }