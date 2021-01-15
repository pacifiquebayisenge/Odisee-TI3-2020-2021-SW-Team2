import { Component } from '@angular/core'

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {





  get self(): AppComponent {
    firebase.firestore().enablePersistence()
      .catch((err) => {
        if (err.code == 'unimplemented') {
          console.log("browser does not support firestore persistence")
        }
      })
    return this;
  }








}


