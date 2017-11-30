import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
	private databaseSubscription: Subscription;

	constructor(private db: AngularFireDatabase) {}

	public ngOnInit(): void {
		this.databaseSubscription = this.db.list('/')
			.snapshotChanges()
			.map(actions => {
				console.log('actions: ', actions);
				return actions.map(action => action.payload.val());
			}).subscribe(
				items => console.log('fetch from database: ', items),
				error => console.error('signOut error: ', error)
			);
	}

	public ngOnDestroy(): void {
		this.databaseSubscription.unsubscribe();
	}

	public saveUser(): void {
		console.log(this.db.database.ref().child('test').set('Some Value'));
	}
}
