// forms.service.ts
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, Form } from '@angular/forms';
import { AuthService } from './auth.service';
import { MatchService } from './match.service'
import { CurrentUser } from './currentUser.service';
import { CrudService } from './crud.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginFormComponent } from '../popups/login-form/login-form.component';
import { RegisterFormComponent } from '../popups/register-form/register-form.component';
import { async } from 'q';
import { from, Subject, Observable, BehaviorSubject } from 'rxjs';
import { SquadFormComponent } from '../popups/squad-form/squad-form.component';
import { TaskFormComponent } from '../popups/task-form/task-form.component';
import { Observer } from 'firebase';



@Injectable({
    providedIn: 'root'
})
export class Forms {

    constructor(
        private matcher: MatchService,
        private fb: FormBuilder,
        private dialog: MatDialog,
        private authService: AuthService,
        public authFireService: AngularFireAuth,
        private crudService: CrudService,
        private currentUser: CurrentUser,
    ) {

        // this.assigns.push({ name: "test" });
    }

    // Login form ----------------------------------------------------------------------------------------------- 


    // login form bindings
    loginForm: FormGroup = new FormGroup({

        email: new FormControl('', [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            Validators.email,


        ]),
        password: new FormControl('', [
            Validators.required

        ])

    });


    // to open login popup
    loginPopup() {
        this.authService.logout()
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '100%';
        dialogConfig.maxWidth = '100%';
        dialogConfig.width = '100%';
        this.dialog.open(LoginFormComponent, dialogConfig);
    }

    // local bool to match with auth service bool -> used in login popup
    loginSucces: boolean;
    loginErr


    async loginSubmit() {

        // get form value
        const formValue = this.loginForm.value;

        await this.authService.login(formValue["email"], formValue["password"]);

        // get login status
        this.loginSucces = this.authService.loginSucces;
        this.loginErr = this.authService.errOutput;



        //  console.log(this.loginSucces);


    }

    // to open register popup
    registerPopup() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '100%';
        dialogConfig.maxWidth = '100%';
        dialogConfig.width = '100%';
        this.dialog.open(RegisterFormComponent, dialogConfig);
    }
    // register form ----------------------------------------------------------------------------------------------- 

    // register form bindings
    registerForm = new FormGroup({

        firstname: new FormControl('', [
            Validators.required

        ]),
        lastname: new FormControl('', [
            Validators.required

        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
            Validators.email,

        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            Validators.minLength(5)

        ]),
        password2: new FormControl('', [
            Validators.required

        ])

    },
        {
            //  validatie om password match te checken
            validators: this.matcher.matchValidator('password', 'password2')


        });


    // local bool to match with auth service bool -> used in register popup
    registerSucces: boolean;

    regErrOutput: string;

    async registerSubmit() {
        // get form value
        const formValue = this.registerForm.value;

        await this.authService.signup(
            formValue["email"],
            formValue["password2"],
            formValue["firstname"],
            formValue["lastname"]
        );

        // get register status 
        this.registerSucces = this.authService.registerSucces;
        this.regErrOutput = this.authService.errOutput;

        // console.log(this.authService.errOutput);

        this.authService.getUser();

        // console.log(formValue);

    }




    // squad form ----------------------------------------------------------------------------------------------- 

    // to get squad registration status 
    regSquadSucces: boolean;
    regSquadErrOutput
    deleteSquad: boolean = false;
    editSquad: boolean = false;
    selectedSquad;
    SquadMembers: Array<string>;
    membersList: Array<string>

    // squad form bindings
    squadForm = new FormGroup({

        name: new FormControl('', [
            Validators.required

        ]),
        icon: new FormControl('',
            [Validators.required

            ]),

        members: new FormArray([

        ])

    });





    get memberForms() {
        return this.squadForm.get('members') as FormArray
    }

    // add new email input field
    addMember() {

        const member = new FormGroup({
            email: new FormControl('', [
                Validators.required,
                Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
                Validators.email,

            ])
        })

        this.memberForms.insert(0, member);
    }

    deleteMember(i) {
        this.memberForms.removeAt(i);
    }

    // to open squad form field
    squadPopup() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '80%';
        dialogConfig.maxWidth = '85%';
        dialogConfig.width = '85%';
        this.dialog.open(SquadFormComponent, dialogConfig);

    }

    async onSubmitSquad() {
       

        // get form value
        const formValue = this.squadForm.value;

        //const uid = this.authService.getUser();

        if (!this.editSquad) {
            console.log("formservice register")

            await this.crudService.RegisterSquad(
                formValue["name"],
                formValue["members"],
                formValue["icon"])
        }
        else {
            console.log("formservice edit")
            this.crudService.editSquad(formValue, this.membersList, this.squadToEditId)
        }

        this.regSquadSucces = this.crudService.regSquadSucces;
        this.regSquadErrOutput = this.crudService.errOutput;

        if (this.regSquadSucces) {
            this.onCloseSquad();
        }
        

    }


    onCloseSquad() {

        this.editSquad = false
        this.deleteSquad = false

        this.squadForm.reset();
        
         this.authService.getUserData(this.currentUser.id)



    }

    squadToEditId;

    onEditSquad(squad: Array<any>, membersList: Array<string>) {

        this.membersList = membersList
        this.SquadMembers = []
        this.squadForm.reset();

        for (let i: number = this.memberForms.controls.length; i > -1; i--) {
            this.deleteMember(0)
        }

        this.squadToEditId = squad[0]
        this.squadForm.controls['name'].setValue(squad[1].Name)
        this.squadForm.controls['icon'].setValue(squad[1].Icon)

        for (let i: number = 0; i < squad[1].Members.length; i++) {
            this.SquadMembers.push(squad[1].Members[i])

        }





    }







    // task form ----------------------------------------------------------------------------------------------- 

    taskErrOutput: string;
    taskSucces: boolean;
    currentSquadId: string

    // als een task wordt meegeven , wil men die wijzigen
    taskToEdit;


    repeats = [
        { name: 'None' },
        { name: 'Every day' },
        { name: 'Every week' },
        { name: 'Every month' },
        { name: 'Every year' }
    ]




    // task form bindings
    taskForm = new FormGroup({


        title: new FormControl('', [
            Validators.required

        ]),
        description: new FormControl(''),

        repeat: new FormControl('', [
            Validators.required

        ]),
        assign: new FormControl('', [
            Validators.required

        ]),
    });

    get squad() {
        return this.taskForm.get('squad')
    }

    get title() {
        return this.taskForm.get('title')
    }

    get description() {
        return this.taskForm.get('description')
    }

    /*
    get repeat() {
      return this.taskForm.get('repeat')
    }
  */

    get assign() {
        return this.taskForm.get('assign.value')
    }



    async  onSubmitTask() {
        // get form value
        const formValue = this.taskForm.value;

        // kijk na of een task wordt mee geven, in geval van ja update ipv creëren 
        if (this.taskToEdit == null) {

            await this.crudService.newTask(
                this.currentSquadId,
                formValue.title,
                formValue.description,
                formValue.repeat,
                formValue.assign,
                this.currentUser.firstname)

        } else {
            await this.crudService.editTask(
                this.currentSquadId,
                this.taskToEdit.Id,
                formValue.title,
                formValue.description,
                formValue.repeat,
                formValue.assign)

        }

        this.taskErrOutput = this.crudService.taskErr
        this.taskSucces = this.crudService.taskSucces
        if (this.taskSucces) {

            this.oncloseTask();


        }



        //console.log(formValue);
        //this.oncloseTask();
    }






    oncloseTask() {


        this.taskForm.reset();





    }

    // 2e parameter om te zien of een taks te editien mee wordt gegeven
    taskPopup(squadId: string, taskEdit) {


        this.taskToEdit = taskEdit;

        if (taskEdit != null) {

            this.formFill(taskEdit)

        }

        this.currentSquadId = squadId
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '80%';
        dialogConfig.maxWidth = '85%';
        dialogConfig.width = '85%';
        this.dialog.open(TaskFormComponent, dialogConfig);
    }

    // vull de form aan met de task to edit
    formFill(task) {

        this.taskForm.controls['title'].setValue(task.Title)
        this.taskForm.controls['description'].setValue(task.Description)
        this.taskForm.controls['repeat'].setValue(task.Repeat)
        this.taskForm.controls['assign'].setValue(task.Assign)

    }




















}
