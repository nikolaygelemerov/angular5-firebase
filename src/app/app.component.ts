import {Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private user: Observable<firebase.User>;
  private authenticated = false;
  private courses: any = [];
  private databaseSubscription: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private af: AngularFireAuth
  ) {

    af.authState
      .subscribe(auth => {
        if (auth != null) {
          this.user = af.authState;
          this.authenticated = true;
        }
      });
  }

  public ngOnInit(): void {}

  public ngDestroy(): void {
    this.databaseSubscription.unsubscribe();
  }

  private login(): void {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(result => {
        this.db.list('/profile')
          .snapshotChanges()
          .map(actions => {
            return actions.map(action => action.payload.val());
          }).subscribe(items => {
          console.log('items: ', items);
        });
      })
      .catch(error => {
        console.error('auth error: ', error);
      });
    this.authenticated = true;
  }

  private signOut(): void {
    this.af.auth.signOut();
    this.authenticated = false;
  }
}
