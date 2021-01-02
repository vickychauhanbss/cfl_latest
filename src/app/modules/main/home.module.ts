import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home.routing';


//Import Libraries
import { Ng5SliderModule } from 'ng5-slider';
import { OwlModule } from 'ngx-owl-carousel';
import { MatVideoModule } from 'mat-video';
import { ProgressBarModule } from "angular-progress-bar";
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EmbedVideo } from 'ngx-embed-video';



//Import Components
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './home/onboarding/onboarding.component';
import { TermsofuseComponent } from './home/termsofuse/termsofuse.component';
import { CookiePolicyeComponent } from './home/Cookie-Policy/Cookie-Policy.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { IMIRAComponent } from './home/IMIRA/IMIRA.component';
import { CrazyFilipDetailsComponent } from './home/crazy-filipina-detail/crazy-filipina-detail.component';
import { ChangePasswordComponent } from './home/change-password/change-password.component';

//Strip Html Pipe
import { StripHtmlPipe } from '../../shared/pipes/removeHtmlTags';
import { SafeHtmlPipeDetail } from '../../shared/pipes/safeHtmlPipeDetails';
import { SharedModule } from '../../shared/shared.module';


//Import Modals
import { DownloadComponent } from './home/download-guide/download-guide.component';
import { videoComponent } from './home/video-model/video-model.component';
import { InstructionComponent } from './home/instruction-model/instruction-model.component';
import { OnboardignModalComponent } from './home/onboarding-modal/onboarding-modal.component';
import { ImagePipe } from '../../shared/pipes/image.pipe';

import {
    MatExpansionModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  } from '@angular/material';
import { AboutcrazyfilipinaloveComponent } from './home/aboutcrazyfilipinalove/aboutcrazyfilipinalove.component';


@NgModule({
    declarations: [
        HomeComponent,
        OnboardingComponent,
        DownloadComponent,
        videoComponent,
        StripHtmlPipe,
        ImagePipe,
        TermsofuseComponent,
        CookiePolicyeComponent,
        PrivacyComponent,
        IMIRAComponent,
        CrazyFilipDetailsComponent,
        ChangePasswordComponent,
        InstructionComponent,
        OnboardignModalComponent,
        AboutcrazyfilipinaloveComponent,
        SafeHtmlPipeDetail
    ],
    imports: [
        SharedModule,
        HomeRoutingModule,
        Ng5SliderModule,
        OwlModule,
        ProgressBarModule,
        MatVideoModule,
        MatExpansionModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        LazyLoadImageModule,
        EmbedVideo.forRoot()
    ],
    exports: [],
    providers: [],
    entryComponents: [DownloadComponent, videoComponent, InstructionComponent, OnboardignModalComponent]//MyModalComponent]
})
export class HomeModule {}