import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import Components
import { HomeComponent } from './home/home.component';
import { OnboardingComponent } from './home/onboarding/onboarding.component';
import { TermsofuseComponent } from './home/termsofuse/termsofuse.component';
import { CookiePolicyeComponent } from './home/Cookie-Policy/Cookie-Policy.component';
import { PrivacyComponent } from './home/privacy/privacy.component';
import { IMIRAComponent } from './home/IMIRA/IMIRA.component';
import { CrazyFilipDetailsComponent } from './home/crazy-filipina-detail/crazy-filipina-detail.component';
import { ChangePasswordComponent } from './home/change-password/change-password.component';

//Import Auth Guard
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AboutcrazyfilipinaloveComponent } from './home/aboutcrazyfilipinalove/aboutcrazyfilipinalove.component';
export const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'onboarding',
		component: OnboardingComponent,
		// canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/ap',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/price/ap',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/checkout/app1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/checkout/app2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/checkout/app3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/apupsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/price/apupsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/checkout/apupsmp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/checkout/apupsmp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/checkout/apupsmp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/bnp',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/price/bnp',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/checkout/bnp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/checkout/bnp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/checkout/bnp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/centerstage/bnpups',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/centerstage/price/bnpups',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/cupg',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/price/cupg',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/checkout/cupgp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/checkout/cupgp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'centerstage/checkout/cupgp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'successcentral/dcds',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'termsofuse',
		component: TermsofuseComponent
	},
	{
		path: 'cookiepolicy',
		component: CookiePolicyeComponent
	},
	{
		path: 'policy',
		component: PrivacyComponent
	},
	{
		path: 'imira',
		component: IMIRAComponent
	},
	{
		path: 'crazyDetail',
		component: CrazyFilipDetailsComponent
	},
	{
		path: 'change-password',
		component: ChangePasswordComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }