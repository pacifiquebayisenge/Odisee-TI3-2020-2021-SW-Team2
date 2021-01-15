import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Forms } from '../../service/forms.service';
import { MatDialogRef } from '@angular/material/dialog';





@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {




  @ViewChild('errMsg') errMsg: ElementRef;

  errOutput: string;

  constructor(
    public formService: Forms,
    public dialogRef: MatDialogRef<RegisterFormComponent>,

  ) { }




  ngOnInit(): void {


    // live uptdate van data input in console
    // this.registerForm.valueChanges.subscribe(console.log);

  }

  onclose() {

    this.dialogRef.close();
  }


  async onSubmit() {
    // get err msg element from the DOM
    let errDisplay = this.errMsg.nativeElement


    await this.formService.registerSubmit()

    // get register output
    this.errOutput = this.formService.regErrOutput;


    // if register succesfull
    if (this.formService.registerSucces) {

      // show succes msg
      errDisplay.style.color = '#2bba00';
      errDisplay.style.display = 'block';

      // hide succes msg after 2 sec + close register popup
      setTimeout(() => {
        errDisplay.style.display = 'none';

        this.dialogRef.close();
        this.formService.registerForm.reset()
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


  }







}
