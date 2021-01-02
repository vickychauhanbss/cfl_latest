import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CusImageComponent } from './components/cus-image/cus-image.component'
import { BgImageDirective } from './directives/bgImage.directive';
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
	],
	declarations: [
		ControlMessagesComponent,
		PageNotFoundComponent,
		SpinnerComponent,
		CusImageComponent,
		BgImageDirective
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MaterialModule,
		ControlMessagesComponent,
		SpinnerComponent,
		PageNotFoundComponent,
		CusImageComponent,
		BgImageDirective
	]
})
export class SharedModule { }