import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Forms } from '../../service/forms.service';
import { AuthService } from '../../service/auth.service';
import { CrudService } from '../../service/crud.service';
import { Icons } from '../../service/icons.service'
import { CurrentUser } from '../../service/currentUser.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatDialog } from '@angular/material/dialog';






@Component({
  selector: 'squad-form',
  templateUrl: './squad-form.component.html',
  styleUrls: ['./squad-form.component.css']
})
export class SquadFormComponent implements OnInit {
  // to get status 
  @ViewChild('errMsg') errMsg: ElementRef;


  constructor(
    public dialogRef: MatDialogRef<SquadFormComponent>,
    public formService: Forms,
    public iconsList: Icons,
    public userService: CurrentUser,
    public dialog: MatDialog,
    public crudService: CrudService,
    public authService: AuthService) { }

  errOutput: string;
  editmode: boolean;
  deletemode: boolean;
  squads: any;
  currentSquad: Array<any> = []
  selectedValue: string;







  ngOnInit(): void {


    this.editmode = this.formService.editSquad
    this.deletemode = this.formService.deleteSquad
    this.squads = this.userService.squads



    //console.log(this.formService.memberForms.controls[0]['controls']    )

    // live uptdate van data input in console
    // this.squadForm.valueChanges.subscribe(console.log);

  }


  async onSubmit() {



    await this.formService.onSubmitSquad()
    this.formService.onCloseSquad();
    this.onClose()
    this.dialogRef.close();






  }


  onClose() {
    this.formService.editSquad = false;
    this.formService.deleteSquad = false;
    //this.formService.onCloseSquad();
    this.formService.closeSquadForm.asObservable().subscribe(() => {
      this.authService.getUserData(this.userService.id)
      console.log('close me');
      this.dialogRef.close();
    })



  }

  async onDelete() {

    await this.crudService.deleteSquad(this.currentSquad).then(() => {
      this.formService.onCloseSquad();
      this.dialogRef.close();
      this.formService.editSquad = false;
      this.formService.deleteSquad = false;
      //this.authService.getUserData(this.userService.id)
    })

  }

  selectedSq(squad) {


    // get the squad
    this.currentSquad = squad

    this.memberList = []

    // haal alle members op van de geselecteerde squad

    for (let i: number = 0; i < squad[1].Members.length; i++) {
      this.memberList.push(squad[1].Members[i])
    }


    this.formService.squadForm.reset();
    this.formService.onEditSquad(squad, this.memberList)


  }





  selectable = true;
  removable = true;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  memberList = [];


  // removing a member of the squad

  remove(member): void {




    const index = this.memberList.indexOf(member);

    console.log(this.memberList[index])


    this.crudService.deleteMember(this.currentSquad[0], this.memberList[index].id)

    // delete member form already gotten squads

    for (let i: number = 0; i < this.userService.squads.length; i++) {
      if (this.userService.squads[i][0] == this.currentSquad[0]) {
        this.userService.squads[i]['1'].Members.splice(index, 1)
      }
    }

    if (index >= 0) {
      this.memberList.splice(index, 1);
    }

    this.formService.onEditSquad(this.currentSquad, this.memberList)
  }








}





