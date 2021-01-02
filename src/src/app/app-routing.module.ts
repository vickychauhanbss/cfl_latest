import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

//Import Components
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';
import { JustJoinComponent } from './modules/help-support/just-join/just-join.component';
import { SafetyGuideComponent } from './modules/help-support/safety-guide/safety-guide.component';
import { HelpsupportComponent } from './modules/help-support/helpsupport/helpsupport.component';
import { CompletetopicsComponent } from './modules/help-support/completetopics/completetopics.component';

//Import auth guard
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{
		path: 'home',
		component: ContentLayoutComponent,
		children: [
			{
				path: '',
				loadChildren: () =>
					import('./modules/main/home.module').then(m => m.HomeModule)
			},
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./modules/user/user.module').then(m => m.UserModule)
			},
			{
				path: 'help-support',
				component: HelpsupportComponent,
				canActivate: [AuthGuard]

			},
			{
				path: 'just-joined',
				component: JustJoinComponent,
				canActivate: [AuthGuard]

			},
			{
				path: 'safety-guide',
				component: SafetyGuideComponent,
				canActivate: [AuthGuard]

			},
			{
				path: 'complete-help-topics',
				component: CompletetopicsComponent,
				canActivate: [AuthGuard]

			},
		]
	},
	{ path: '**', component: PageNotFoundComponent }
];
const config: ExtraOptions = {
	useHash: false,
};
@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
