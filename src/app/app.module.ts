import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {HomeGuardService} from './home-guard.service';
import {LoginComponent} from './components/login/login.component';
import {ROUTING} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		HomeComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		ROUTING
	],
	providers: [HomeGuardService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
