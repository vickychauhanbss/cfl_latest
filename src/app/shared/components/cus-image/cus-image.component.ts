import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { appConfig } from 'src/app/shared/services/app.config'
declare var $;
@Component({
	selector: 'cus-image',
	templateUrl: './cus-image.component.html',
	styleUrls: ['./cus-image.component.css']
})
export class CusImageComponent implements OnInit, OnChanges {
	@Input('url') url : string = '';
	@Input('loaderSize') loaderSize : any = '1';
	routeUrl = appConfig.apiUrl;
	myUrl : string  = '';
	@Input('dimension') dimension : string = '100x100';
	@Input('widthIns') elementWidthIns : string;
	@Input('actualDimension') actualDimension : string = '100x100';
	height : number  = 0;
	width : number  = 0;
	actualHeight : number  = 0;
	actualWidth : number  = 0;
	isLoading = true;
	ins : any;
	constructor() { }
	ngOnInit() {
		this.renderImage();
		$(window).on('resize',() => {
			if(this.ins) {
				clearTimeout(this.ins);
			}
			this.ins = setTimeout(()=>{
				this.renderImage();
			},300);
	  	});
	}

	//If data passed to component changed
	ngOnChanges(changes) {
		this.renderImage();
	}

	imageLaoded(event) {
		this.isLoading = false;
	}

	renderImage() {
		if(this.dimension && this.actualDimension) {
			let dimensionTemp = this.dimension.split('x');
			this.width = parseInt(dimensionTemp[0]);
			if(this.elementWidthIns) {
				// console.log('this.elementWidthIns.nativeElement',$(this.elementWidthIns).width());
				this.width = parseInt(($(this.elementWidthIns).width()).toFixed(0));
				if(this.width === 0) {
					this.width = parseInt(dimensionTemp[0]);
				}
			}
			this.height = parseInt(dimensionTemp[1]);
			let actualDimensionTemp = this.actualDimension.split('x');
			this.actualWidth = parseInt(actualDimensionTemp[0]);
			this.actualHeight = parseInt(actualDimensionTemp[1]);
			if(this.width > 0) {
				const mod = this.actualWidth/this.width;
				this.height = parseInt((this.actualHeight/mod).toFixed(0));
			}
		}
		var test =  this.url.split('/');
		const test2 =  test.join('*');
		this.myUrl = this.routeUrl+'get-resize-image/'+test2+'/'+this.width+'/'+this.height;
	}
}
