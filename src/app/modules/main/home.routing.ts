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
import { OnboardingGuard } from  '../../shared/guards/onboarding.guard';

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
		path: 'trustplus/apm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/apfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/price/apm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/price/apfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/apmp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/apmp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/apmp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/apfip1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/apfip2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/apfip3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/apupsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/apupsfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/price/apupsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/price/apupsfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/apupsmp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/apupsmp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/apupsmp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/apupsfip1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/apupsfip2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/apupsfip3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/bnpm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/bnpfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/price/bnpm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/price/bnpfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/bnpm1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/bnpm2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/bnpm3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/bnpfi1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/bnpfi2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/checkout/bnpfi3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/bnpupsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/bnpupsfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/price/bnpupsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/price/bnpupsfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsmp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsmp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsmp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsfip1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsfip2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'trustplus/centerstage/checkout/bnpupsfip3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/cupgm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/price/cupgm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/cupgmp1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/cupgmp2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/cupgmp3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/cupgfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/price/cupgfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/cupgfip1',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/cupgfip2',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'centerstage/checkout/cupgfip3',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'successcentral/dcdsm',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
	},
	{
		path: 'successcentral/dcdsfi',
		component: AboutcrazyfilipinaloveComponent,
		canActivate: [AuthGuard, OnboardingGuard]
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