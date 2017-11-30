import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from './components/login/login.component';
import {HomeGuardService} from './home-guard.service';
import {HomeComponent} from './components/home/home.component';

const APP_ROUTES: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [HomeGuardService]
	},
	{
		path: 'login',
		component: LoginComponent
	}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
