import { Component, OnInit, OnChanges, ViewChild, Input, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskFormComponent } from '../../popups/task-form/task-form.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CrudService } from '../../service/crud.service';
import { Forms } from '../../service/forms.service'
import { element } from 'protractor';
import { MatTable } from '@angular/material/table';
import { CurrentUser } from 'src/app/service/currentUser.service';
import { Naming } from 'src/app/service/page.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { threadId } from 'worker_threads';

@Component({
  selector: 'squad-page',
  templateUrl: './SquadPage.component.html',
  styleUrls: ['./SquadPage.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})

export class SquadPageComponent implements OnInit {
  constructor(
    private formService: Forms,
    private route: ActivatedRoute,
    private crudService: CrudService,
    private currentUser: CurrentUser,
    private titleService: Naming) { }



  @ViewChild(MatTable) table: MatTable<Task>

  squadId: string
  SquadData: Array<any> = [];


  async ngOnInit() {

    // get the squad id that is given in the url
    this.route.paramMap
      .subscribe(params => {
        this.squadId = params.get('squadId');

      })


    this.getSquadData(this.squadId)

    // method to change page tittle to the page name
    this.titleService.changeTittle(this.SquadData[0][1].Name)


    await this.getSquadTask(this.squadId)






  }

  allTasks: Array<any>;

  tasks: Task[] = [];

  dataSource = this.tasks;
  displayedColumns = ['State', 'Title', 'Assign'];
  expandedElement: Task | null;


  // realtime lister for tasks in current squad
  async getSquadTask(squadId) {

    this.allTasks = []
    let taskQuery = this.crudService.firebase.firestore().collection('Squads').doc(squadId).collection('tasks')

    taskQuery.onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
      snapshot.docChanges().forEach(element => {


        // dublele aray to get the id too
        if (element.type === "added") {
          this.allTasks.push([element.doc.id, element.doc.data()])


        }
        // dublele aray to get the id too
        if (element.type === "modified") {
          for (let i: number = 0; i < this.allTasks.length; i++) {
            if (element.doc.id == this.allTasks[i][0]) {
              this.allTasks[i] = [element.doc.id, element.doc.data()]



            }
          }
        }
        if (element.type === "removed") {
          console.log("removed" + element.doc.data())
          for (let i: number = 0; i < this.allTasks.length; i++) {
            if (element.doc.id == this.allTasks[i][0]) {
              this.allTasks.splice(i, 1)
            }
          }



        }
      })


      this.updateCurrentSquad(this.squadId, this.allTasks)
      this.populate()




    })
  }

  // render tasks list
  async populate() {

    this.tasks = [];

    // create task obj for each task
    for (let i = 0; i < this.allTasks.length; i++) {

      let taskObj: Task = {

        Id: this.allTasks[i][0],
        Title: this.allTasks[i][1].Title,
        Repeat: this.allTasks[i][1].Repeat,
        Assign: this.allTasks[i][1].Assign,
        Description: this.allTasks[i][1].Description,
        Author: this.allTasks[i][1].Author,
        State: this.allTasks[i][1].State

      }

      // push that task obj to array
      this.tasks.push(taskObj)

    }

    // refresh table
    this.table.renderRows()

  }

  async onEdit(task) {
    this.formService.taskPopup(this.squadId, task)

  }


  async onDelete(taskId) {
    this.crudService.deleteTask(this.squadId, taskId);

    //Filter de gedelete ID uit de data
    this.tasks = this.tasks.filter(item => item.Id != taskId);
  }

  oncomplete(taskId) {

    this.crudService.updateTask(this.squadId, taskId)

  }

  async createTask() {
    let taskEdit = null;
    this.formService.taskPopup(this.squadId, taskEdit)

  }


  // get squad data by id of already gotten squads list where current user is part of 
  getSquadData(squadId: string) {
    for (let i: number = 0; i < this.currentUser.squads.length; i++) {
      if (this.currentUser.squads[i][0] == squadId) {
        this.SquadData.push(this.currentUser.squads[i])
        console.log(this.SquadData)
      }
    }
  }

  updateCurrentSquad(squadId: string, allTasks: Array<any>) {
    for (let i: number = 0; i < this.currentUser.squads.length; i++) {
      if (squadId == this.currentUser.squads[i][0]) {
        this.currentUser.squads[i]['2'] = allTasks
      }
    }
  }



}

export interface Task {
  Id: string;
  Title: string;
  Repeat: string;
  Assign: string;
  Description: string;
  Author: String;
  State: string;
}
