import { Component, Input, OnInit } from '@angular/core';
@Component({
	selector: 'spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
	@Input('isLoading') public isLoading = false;
	@Input('viewBox') size = 1;
	scaleXY : string;
	ngOnInit() {
		this.scaleXY = 'scale(' +this.size+ ')';
	}
}
