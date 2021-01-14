import { Component, OnInit } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, } from '@angular/fire/firestore';
import { View } from '@syncfusion/ej2-angular-schedule';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Naming } from '../../service/page.service';
import { CrudService } from 'src/app/service/crud.service';
import { CurrentUser } from 'src/app/service/currentUser.service';


@Component({
  selector: 'calender-page',
  template: '<ejs-schedule  [currentView]="setView"></ejs-schedule>',
  styleUrls: ['./CalenderPage.component.css']
})
export class CalenderPageComponent implements OnInit {

  constructor(
    private service: Naming,
    private firebase: FirebaseApp,
    private firestore: AngularFirestore,
    private crudService: CrudService,
    private currentUser: CurrentUser,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  db: AngularFirestore


  pageTittle: string = "Calender";


  data;

  sq = this.currentUser.squads



  public setView: View = 'Month'

  async  ngOnInit() {
    // if squads data not loaded redirect tot home page
    if (this.sq.length == 0) {
      console.log("empty redirect me ")
      this.router.navigate(['']);
    }
    // method to change page tittle to the page name
    this.service.changeTittle(this.pageTittle)

    //get all user squads
    let squads = await this.crudService.GetAllUserSquads(this.currentUser.id)


    let tasks = []

    //get all tasks of the user
    for (let i = 0; i < squads.length; i++) {
      tasks.push(await this.crudService.getAllTasksForOneUserPerSquad(squads[i][0]))
    }




    this.data = tasks

    //schedule object
    let schObj = (document.querySelector('.e-schedule') as any).ej2_instances[0];
    console.log(schObj)
    for (let j = 0; j < this.data.length; j++) {

      for (let i = 0; i < this.data[j].length; i++) {
        console.log("dit is de data")
        console.log(this.data)

        //create schedule object 
        this.data[j][i].StartTime = new Date(Number(this.data[j][i][1].StartTime[0]), Number(this.data[j][i][1].StartTime[1]), Number(this.data[j][i][1].StartTime[2]))
        this.data[j][i].EndTime = new Date(Number(this.data[j][i][1].StartTime[0]), Number(this.data[j][i][1].StartTime[1]), Number(this.data[j][i][1].StartTime[2]))
        this.data[j][i].Subject = this.data[j][i][1].Title
        this.data[j][i].Description = this.data[j][i][1].Description
        this.data[j][i].IsAllDay = true


        console.log("forloop data")
        console.log(this.data[j][i][1])

        switch (this.data[j][i][1].Repeat) {
          case "Every day": {
            this.data[j][i].RecurrenceRule = "FREQ=DAILY;INTERVAL=1"
            break;
          }
          case "Every week": {
            this.data[j][i].RecurrenceRule = "FREQ=WEEKLY;INTERVAL=1"
            break;
          }
          case "Every month": {
            this.data[j][i].RecurrenceRule = "FREQ=MONTHLY;INTERVAL=1"
            break;
          }
          case "Every year": {
            this.data[j][i].RecurrenceRule = "FREQ=YEARLY;INTERVAL=1"
            break;
          }
          case "None": {
            this.data[j][i].RecurrenceRule = "FREQ=DAILY;INTERVAL=1;COUNT=1"
            break;
          }
        }

        console.log(this.data);
      }

    }

    //Create 1 array as datasource
    let dataCalander = []
    for (var g = 0; g < this.data.length; g++) {
      dataCalander = dataCalander.concat(this.data[g]);
    }
    schObj.eventSettings.dataSource = dataCalander;

  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 20000,
      panelClass: [className]
    });
  }








}


