import {RouterModule, Routes} from "@angular/router";

import {LoginComponent} from './components/login/login.component';
import {HomeGuardService} from './home-guard.service';
import {HomeComponent} from './components/home/home.component';

const APP_ROUTES: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	}
];

export const ROUTING = RouterModule.forRoot(APP_ROUTES);
