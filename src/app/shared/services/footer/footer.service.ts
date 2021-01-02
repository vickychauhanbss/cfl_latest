import { Injectable, Output, EventEmitter } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class footerService {
	@Output() hideFooter: EventEmitter<boolean> = new EventEmitter();
	constructor() { }
	hidefooter(bit) {
		this.hideFooter.emit(bit);
	}
}