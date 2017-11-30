import {Component, OnDestroy} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnDestroy {
	private user: Observable<firebase.User>;
	private authenticated = false;
	private fireAuthSubscription: Subscription;

	constructor(
		private af: AngularFireAuth,
		private router: Router
	) {
		this.fireAuthSubscription = af.authState
			.subscribe(auth => {
				if (auth != null) {
					this.user = af.authState;
					this.authenticated = true;
					this.router.navigate(['/home']);
				}
			});
	}

	public ngOnDestroy(): void {
		this.fireAuthSubscription.unsubscribe();
	}

	public login(): void {
		this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
			.then(result => {
				this.authenticated = true;
			})
			.catch(error => {
				console.error('Login Error: ', error);
			});
	}

	public signOut(): void {
		this.af.auth.signOut()
			.then(() => {
				this.authenticated = false;
			})
			.catch(error => {
				console.error('SignOut Error: ', error);
			});
	}

}
