import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

@Injectable()
export class HomeGuardService implements CanActivate {

	private user: Observable<firebase.User>;
	private authenticated = false;

	constructor(
		private af: AngularFireAuth,
		private router: Router
	) {
		af.authState
			.subscribe(auth => {
				if (auth != null) {
					this.user = af.authState;
					this.authenticated = true;
				}
			});
	}

	/**
	 * does a check if the user is signed in
	 * @param {ActivatedRouteSnapshot} route
	 * @returns {boolean}
	 */
	public canActivate(): boolean {
		if (this.authenticated) {
			return true;
		} else {
			this.router.navigate(['/login']);
			return false;
		}
	}
}
