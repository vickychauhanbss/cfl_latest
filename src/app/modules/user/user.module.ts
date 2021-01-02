import { NgModule } from '@angular/core';
import { UserDashboardRoutingModule } from './user.routing';

//Import libraries
import { OwlModule } from 'ngx-owl-carousel';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatInputModule, MatFormFieldModule } from '@angular/material';
import { NgxPayPalModule } from 'ngx-paypal';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxGaugeModule } from 'ngx-gauge';
import { ChartsModule } from 'ng2-charts';
import { Ng5SliderModule } from 'ng5-slider';
import { MatVideoModule } from 'mat-video';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { MatTabsModule } from '@angular/material/tabs';
import { MomentModule } from 'ngx-moment';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { EmbedVideo } from 'ngx-embed-video';



// Import components
import { SharedModule } from 'src/app/shared/shared.module';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { VideopageComponent } from './videopage/videopage.component';
import { CenterstageComponent } from './centerstage/centerstage.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { IconComponent } from './icon-modal/icon-modal.component';
import { UserlistComponent } from './liked-user-list/liked-user-list.component';
import { RetakeModalComponent } from './retake-modal/retake-modal.component';
import { PhilipinesComponent } from './philipines-state/philipines-state.component';
import { ChooseGallaryComponent } from './choose-gallary-chat/choose-gallary.component';
import { ChatConfimationComponent } from './chat-confirmation/chat-confirmation.component';
import { MembershipplanComponent } from './membershipplan/membershipplan.component';
import { MorepreferencesComponent } from './morepreferences/morepreferences.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ChatComponent } from './chat/chat.component';
import { CompleteProfileModalComponent } from './complete-profile-modal/complete-profile-modal.component';
import { videoUserComponent } from './video-model-user/video-model.component';
import { QucikviewComponent } from './quick-view/quick-view.component';
import { coverBannerComponent } from './cover-banner-modal/cover-banner-modal.component';
import { CropbannerComponent } from './crop-banner/crop-banner.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentComponent } from './payment/payment.component';
import { AccountComponent } from './account/account.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { ChangePassword } from './change-password-modal/change-password.component';
import { showMessageComponent } from './show-message/show-message.component';
import { FoundTheOneComponent } from './fount-the-one/fount-the-one.component';
import { FoundConnectComponent } from './fount-one-users/fount-one-users.component'
import { TrustScoreComponent } from './trust-score-popup/trust-score-popup.component';
import { WarningPopupComponent } from './warning-popup/warning-popup.component';
import { OpenImageComponent } from './open-image/open-image.component';




// Chat list
import { ChatListComponent } from './chat-list/chat-list.component';
import { ConversationComponent } from './conversation/conversation.component';
import { FormSupportModule } from '../../modules/form-support/form-support.module';
import { AuthGuardService } from '../../shared/services/auth-guard/auth-guard.service';
import { FormService } from '../../shared/services/form/form.service';
import { accountHtmlPipe } from '../../shared/pipes/accountSettingHtmlTags';
import { SafeHtmlPipe } from '../../shared/pipes/safeHtmlPipe';
import { ImagePipeUser } from '../../shared/pipes/userImages.pipe';
import { Utf8EmojisToImagesPipe } from '../../shared/pipes/emoji.pipe';
import { UploadvideoprogressComponent } from './uploadvideoprogress/uploadvideoprogress.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

// In your App's module:
@NgModule({
    declarations: [
        UserdashboardComponent,
        UserprofileComponent,
        VideopageComponent,
        CenterstageComponent,
        EditprofileComponent,
        MembershipplanComponent,
        CompleteProfileModalComponent,
        WelcomeComponent,
        MorepreferencesComponent,
        IconComponent,
        videoUserComponent,
        coverBannerComponent,
        NotificationsComponent,
        CropbannerComponent,
        QucikviewComponent,
        UserlistComponent,
        RetakeModalComponent,
        PaymentComponent,
        AccountComponent,
        ChatComponent,
        accountHtmlPipe,
        PhilipinesComponent,
        ChatListComponent,
        ConversationComponent,
        ChooseGallaryComponent,
        ChatConfimationComponent,
        ChangePassword,
        showMessageComponent,
        SafeHtmlPipe,
        Utf8EmojisToImagesPipe,
        ImagePipeUser,
        FoundTheOneComponent,
        FoundConnectComponent,
        TrustScoreComponent,
        WarningPopupComponent,
        OpenImageComponent,
        UploadvideoprogressComponent,
        // ImagePipe
    ],
    imports: [
        SharedModule,
        UserDashboardRoutingModule,
        ChartsModule,
        Ng5SliderModule,
        OwlModule,
        InfiniteScrollModule,
        ImageCropperModule,
        MatFormFieldModule,
        MatInputModule,
        NgxPayPalModule,
        UiSwitchModule,
        FormSupportModule,
        NgxGaugeModule,
        MatVideoModule,
        PickerModule,
        MatTabsModule,
        MomentModule,
        LazyLoadImageModule,
        MatProgressBarModule,
        EmbedVideo.forRoot(),


    ],
    exports: [ChatListComponent,ConversationComponent, MatTabsModule],
    providers: [FormService, AuthGuardService],
    entryComponents: [IconComponent, videoUserComponent, QucikviewComponent, coverBannerComponent, CropbannerComponent, UserlistComponent, RetakeModalComponent, PhilipinesComponent, ChooseGallaryComponent, ChatConfimationComponent, WelcomeComponent, ChangePassword, showMessageComponent, FoundTheOneComponent, FoundConnectComponent, TrustScoreComponent, WarningPopupComponent, OpenImageComponent, UploadvideoprogressComponent]
})
export class UserModule {}