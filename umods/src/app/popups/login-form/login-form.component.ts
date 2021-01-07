import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Forms } from '../../service/forms.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

//import { from } from 'rxjs';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('errMsg') errMsg: ElementRef;

  errOutput: string;

  constructor(
    public formService: Forms,
    public dialogRef: MatDialogRef<LoginFormComponent>,
    public firebaseAuth: AngularFireAuth,
    private router: Router,
    private crudservice: CrudService
  ) { }

  ngOnInit(): void {



    // live uptdate van data input in console
    // this.loginForm.valueChanges.subscribe(console.log);

  }


  async onSubmit() {

    // get err msg element from the DOM
    let errDisplay = this.errMsg.nativeElement

    await this.formService.loginSubmit()


    // get login output
    this.errOutput = this.formService.loginErr;

    // if login succesfull 
    if (this.formService.loginSucces) {



      // show succes msg
      errDisplay.style.color = '#2bba00';
      errDisplay.style.display = 'block';

      // hide succes msg after 2 sec + close register popup
      setTimeout(() => {
        errDisplay.style.display = 'none';
        this.dialogRef.close();
        this.router.navigate(['']);
      }, 2000);





    } else {

      // if login unsuccesfull

      // show err msg
      errDisplay.style.display = 'block';

      // hide err msg
      setTimeout(() => {


        errDisplay.style.display = 'none';
      }, 3000)

    }











  }





}