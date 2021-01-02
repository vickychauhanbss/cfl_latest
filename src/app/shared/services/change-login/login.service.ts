
import { Injectable, Output, EventEmitter } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class loginService {
  @Output() redirectPage: EventEmitter<boolean> = new EventEmitter();
  @Output() redirectRegister: EventEmitter<boolean> = new EventEmitter();

  constructor() { }
  redirectlogin(bit) {
    this.redirectPage.emit(bit);
    // false for SurveyMode
  }


  redirectRegisterPage(bit) {
    this.redirectRegister.emit(bit);
    // false for SurveyMode
  }
}