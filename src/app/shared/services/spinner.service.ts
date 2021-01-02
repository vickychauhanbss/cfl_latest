
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class NgxSpinnerService {
    isLoading: boolean = true;
    timeoutIns : any;
    constructor() { }

    show() {
        this.isLoading = true;
    }

    hide() {
        this.isLoading = false;
    }
}