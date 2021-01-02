import { appConfig } from 'src/app/shared/services/app.config'
import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';//add jquery reference
declare var $: any;
@Directive({
	selector: '[bgImage]'
})

export class BgImageDirective implements AfterViewInit {
	@Input('bgImage') url : string = '';
	@Input('defaultBanner') defaultBanner : string = '';
	@Input('loaderSize') loaderSize : any = '1';
	routeUrl = appConfig.apiUrl;
	myUrl : string  = '';
	@Input('actualDimension') actualDimension : string = '100x100';
	height : number  = 0;
	width : number  = 0;
	actualHeight : number  = 0;
	actualWidth : number  = 0;
	isLoading = true;
	ins : any;
	constructor(private element: ElementRef) {
		// alert();
	}

	ngAfterViewInit() {
		if(this.actualDimension) {
			this.renderImage();
		}
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
	ngOnChanges() {
		this.renderImage();
	}

	imageLaoded(event) {
		this.isLoading = false;
	}

	renderImage() {
		if(this.actualDimension) {
			this.width = this.element.nativeElement.clientWidth;
			console.log('this.width,',this.width);
			let actualDimensionTemp = this.actualDimension.split('x');
			this.actualWidth = parseInt(actualDimensionTemp[0]);
			this.actualHeight = parseInt(actualDimensionTemp[1]);
			const mod = this.actualWidth/this.width;
			this.height = parseInt((this.actualHeight/mod).toFixed(0));
		}
		var test =  this.url.split('/');
		const test2 =  test.join('*');
		this.myUrl = this.routeUrl+'get-resize-image/'+test2+'/'+this.width+'/'+this.height;
		if(this.url != '' && this.url != undefined) {
			this.element.nativeElement.style.backgroundImage = "url('"+this.myUrl+"')";
		} else {
			this.element.nativeElement.style.backgroundImage = "url('"+this.defaultBanner+"')";
		}
	}
}