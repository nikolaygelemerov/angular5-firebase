import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public courses: any = [];

  constructor(db: AngularFireDatabase) {
    db.list('/courses')
      .snapshotChanges()
      .map(actions => {
        console.log('actions: ', actions);
        return actions.map(action => action.payload.val());
      }).subscribe(items => {
        console.log('items: ', items);
      });
  }
}
