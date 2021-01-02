import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Components
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserprofileComponent } from "./userprofile/userprofile.component";
import { VideopageComponent } from "./videopage/videopage.component";
import { CenterstageComponent } from "./centerstage/centerstage.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";
import { CompleteProfileModalComponent } from "./complete-profile-modal/complete-profile-modal.component";
import { MembershipplanComponent } from './membershipplan/membershipplan.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MorepreferencesComponent } from './morepreferences/morepreferences.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PaymentComponent } from './payment/payment.component';
import { AccountComponent } from './account/account.component';
import { ChatComponent } from './chat/chat.component';

//Import auth guard
import { AuthGuard } from  '../../shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: UserdashboardComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'userprofile',
        component: UserprofileComponent,
         canActivate: [AuthGuard]
    },
    {
        path: 'uservideo',
        component: VideopageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'centerstage',
        component: CenterstageComponent,
         canActivate: [AuthGuard]
    },
    {
        path: 'editprofile',
        component: EditprofileComponent,
         canActivate: [AuthGuard]
    },
    {
        path: 'membershipplan',
        component: MembershipplanComponent,
         canActivate: [AuthGuard]
    },
    {
        path: 'complete-profile',
        component: CompleteProfileModalComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'welcome',
        component: WelcomeComponent
    },
    {
        path: 'morepreferences',
        component: MorepreferencesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'notification',
        component: NotificationsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'my-account',
        component: AccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'user-chat',
        component: ChatComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserDashboardRoutingModule { }