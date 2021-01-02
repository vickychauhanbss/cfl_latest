import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

//Import Libraries
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgressBarModule } from "angular-progress-bar";
import { ToastrModule } from 'ng6-toastr-notifications';

//Import Components
import { SharedModule } from './shared/shared.module';
import { ComingsoonComponent } from './coming-soon/coming-soon.component';
import { SubscribeComponent } from '../../src/app/modules/main/home/subscribe-modal/subscribe-modal.component';
import { JustJoinComponent } from './modules/help-support/just-join/just-join.component';
import { SafetyGuideComponent } from './modules/help-support/safety-guide/safety-guide.component';
import { HelpsupportComponent } from './modules/help-support/helpsupport/helpsupport.component';
import { CompletetopicsComponent } from './modules/help-support/completetopics/completetopics.component';
import { ForgotPasswordComponent } from './modules/main/home/forgot-password/forgot-password.component';

//Import Layout Components
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

//Import Modals
import { loginComponent } from '../../src/app/modules/main/home/login-modal/login-modal.component';
import { StartnowModal } from '../../src/app/modules/main/home/start-now-modal/start-now.component';
import { VerifyComponent } from '../../src/app/modules/main/home/verify-model/verify-model.component';
import { ConfirmationComponent } from '../../src/app/modules/main/home/confirmation-model/confirmation-model.component';
import { PlanValidationPopup } from '../../src/app/modules/user/plan-validation-popup/plan-validation-popup.component';
import { helpHtmlPipe } from './shared/pipes/helpandsupport';

//Import services
import { ChatService } from './shared/services/chat/chat.service';
import { SocketService } from './shared/services/socket/socket.service';

//Import interceptor
import { JwtInterceptor } from '../app/shared/http-interceptor/interceptor';
import { ErrorInterceptor } from '../app/shared/http-interceptor/error.interceptor';
import { NgxSpinnerService } from "src/app/shared/services/spinner.service";
//Socail login config
import { EmbedVideoService } from 'ngx-embed-video';
import {
	SocialLoginModule,
	AuthServiceConfig,
	GoogleLoginProvider,
	FacebookLoginProvider,
} from "angular-6-social-login-v2";


// Configs
export function getAuthServiceConfigs() {
	let config = new AuthServiceConfig(
		[
			{
				id: FacebookLoginProvider.PROVIDER_ID,
				provider: new FacebookLoginProvider("1428663227291006")
			},
			{
				id: GoogleLoginProvider.PROVIDER_ID,
				provider: new GoogleLoginProvider("249164792400-84r5g4318h4rc0auj05pd0ndvtvfm844.apps.googleusercontent.com")
			}
		]
	);
	return config;
}

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		FooterComponent,
		ContentLayoutComponent,
		loginComponent,
		StartnowModal,
		SubscribeComponent,
		JustJoinComponent,
		SafetyGuideComponent,
		HelpsupportComponent,
		CompletetopicsComponent,
		VerifyComponent,
		ConfirmationComponent,
		ForgotPasswordComponent,
		ComingsoonComponent,
		helpHtmlPipe,
		PlanValidationPopup
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MatInputModule,
		MatAutocompleteModule,
		// HelpSupportModule,
		FormsModule,
		ReactiveFormsModule,
		UiSwitchModule,
		HttpClientModule,
		ToastrModule.forRoot(),
		SocialLoginModule,
		ProgressBarModule,
		//shared
		SharedModule

	],
	providers: [
		SocketService,
		NgxSpinnerService,
		{ provide: AuthServiceConfig, useFactory: getAuthServiceConfigs },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		ChatService,
		EmbedVideoService
	],
	bootstrap: [AppComponent],
	entryComponents: [
		loginComponent,
		StartnowModal,
		SubscribeComponent,
		VerifyComponent,
		ConfirmationComponent,
		ForgotPasswordComponent,
		ComingsoonComponent,
		PlanValidationPopup
	]
})
export class AppModule { }
