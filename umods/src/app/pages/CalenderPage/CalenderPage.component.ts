import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';

import { Naming } from '../../service/page.service';

@Component({
  selector: 'calender-page',
  templateUrl: './CalenderPage.component.html',
  styleUrls: ['./CalenderPage.component.css']
})
export class CalenderPageComponent implements OnInit {

  constructor(
    private service: Naming,
    private firebase: FirebaseApp,
    private firestore: AngularFirestore
  ) { }

  data: Array<string>

  pageTittle: string = "Calender";

  ngOnInit() {

    this.data = []
    // method to change page tittle to the page name
    this.service.changeTittle(this.pageTittle)

    this.firebase.firestore().collection("Squads").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(element => {

        if (element.type === "modified") {
          console.log("mod")
          this.data[this.data.indexOf(element.doc.id)] = element.doc.id

        }

        if (element.type === "added") {
          console.log("add")
          this.data.push(element.doc.id)
        }

        if (element.type === "removed") {
          console.log("removed" + element.doc.data().Firstname)
          this.data.splice(this.data.indexOf(element.doc.id))
          this.ngOnInit()
        }


      });
    })


  }





}
