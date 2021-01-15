import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Forms } from '../../service/forms.service';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUser } from 'src/app/service/currentUser.service';
import { CrudService } from 'src/app/service/crud.service';


@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  // to get status 
  @ViewChild('errMsg') errMsg: ElementRef;
  squadId: string
  errOutput: string;
  allSquads: Array<any>;
  members: Array<any> = [];
  membersNames: Array<any> = [];


  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    public formService: Forms,
    private currentUser: CurrentUser,
    private crudService: CrudService) { }

  async ngOnInit() {

    await this.getSquadMembers()
  }



  async onSubmit() {

    // get err msg element from the DOM
    let errDisplay = this.errMsg.nativeElement

    await this.formService.onSubmitTask()

    // get register output
    this.errOutput = this.formService.taskErrOutput
    this.onClose()

    /*
    // if register succesfull
    if (this.formService.taskSucces) {

      // show succes msg
      errDisplay.style.color = '#2bba00';
      errDisplay.style.display = 'block';

      // hide succes msg after 2 sec + close register popup
      setTimeout(() => {
        errDisplay.style.display = 'none';

        this.onClose()
      }, 2000);

    } else {
      // if register unsuccesfull

      // show err msg
      errDisplay.style.display = 'block';

      // hide err msg
      setTimeout(() => {


        errDisplay.style.display = 'none';
      }, 3000)

    }

    */

  }

  onClose() {

    this.formService.oncloseTask();
    this.dialogRef.close();

    this.formService.closeTaskForm.asObservable().subscribe(() => {
      this.dialogRef.close();
    })

  }

  async getSquadMembers() {

    this.squadId = this.formService.currentSquadId;

    // get all squads form current user : already gotten
    this.allSquads = this.currentUser.squads;

    console.log(this.allSquads);
    // look in the already gotten squadlist of the current user
    for (let i: number = 0; i < this.allSquads.length; i++) {

      // is clicked squad id is equal to squadid in the already gotten list
      if (this.allSquads[i][0] == this.squadId) {

        for (let j: number = 0; j < this.allSquads[i][1].Members.length; j++) {
          // get this squad members
          this.membersNames.push(this.allSquads[i][1].Members[j].name + ' ' + this.allSquads[i][1].Members[j].lastname)
          console.log(this.allSquads[i][1].Members[j])
        }
      }
    }

  }

}



