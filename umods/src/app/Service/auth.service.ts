// auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';
import { CurrentUser } from './currentUser.service'
import { AngularFirestore } from '@angular/fire/firestore';
import { CrudService } from './crud.service';
import { AngularFireModule } from '@angular/fire';
import { FirebaseApp } from '@angular/fire';





@Injectable({
  providedIn: 'root'
})
export class AuthService {



  user: Observable<firebase.User>;



  constructor(
    public firebaseAuth: AngularFireAuth,
    public firestore: AngularFirestore,
    public currentUserService: CurrentUser,
    private crudService: CrudService,
    public firebase: AngularFireModule,
    public firebaseApp: FirebaseApp,

  ) {
    this.user = firebaseAuth.authState;

    this.firebaseAuth.authState.subscribe(auth => {
      if (auth) {
        console.log("logged in ")

        this.getUserData(auth.uid)

      } else {
        console.log(" not logged in ")
      }
    })




  }




  // bool to see if login is succesfull
  registerSucces: boolean;

  errOutput: string;

  // Register de user in firebase authentication database
  async signup(email: string, password: string, firstname: string, lastname: string) {
    await this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {

        console.log('Success!', value.user.uid);

        // bij succes -> user opgeslagen in database
        this.firestore.collection('Users').doc(value.user.uid).set({
          Email: email,
          Firstname: firstname,
          Lastname: lastname,
          Id: value.user.uid
        });

        // get register status
        this.registerSucces = true;
        this.errOutput = "Register succesfull"




      })
      .catch(err => {

        console.log('Something went wrong with the registration:', err.message);

        // get register status
        this.registerSucces = false;
        this.errOutput = err.message;

      });

  }



  // bool to see if login is succesfull
  loginSucces: boolean;



  // Methode om in te loggen in firebase auth
  async login(email: string, password: string) {

    await this.firebaseAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {


        console.log('Nice, it worked!  ' + value.user.uid);
        localStorage.setItem('userId', value.user.uid);

        // ????????
        console.log(this.getUser());

        // get login status
        this.loginSucces = true;
        this.errOutput = "login succesfull"

        //this.getUserData(value.user.uid)




      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.loginSucces = false;
        this.errOutput = err.message;
      });


  }




  // trigger to get know when squads are fully loaded for display.
  sqLoadTrigger = new BehaviorSubject<boolean>(false);
  noSqFound = new BehaviorSubject<boolean>(false)



  async formatData(uid: string, squads: Array<any>) {


    // haal alle tasks op van al deze sqauds en push ze in dezelfde array
    for (let i: number = 0; i < squads.length; i++) {
      squads[i].push(await this.crudService.getAllTasks(squads[i][0]))

    }



    let MemberNames = [];

    // loop door al opgehaalde squads 
    for (let i: number = 0; i < squads.length; i++) {

      // loop door members van die squads
      for (let j: number = 0; j < squads[i][1].Members.length; j++) {

        // haal alle member voornamen op met de id
        let member = {

          id: squads[i][1].Members[j],
          name: await this.crudService.GetUserFirstnameById(squads[i][1].Members[j]),
          lastname: await this.crudService.GetUserLastnameById(squads[i][1].Members[j])
        }
        MemberNames.push(member);
      }

      // array van voornaam + id in de juiste squad plaatsen
      squads[i][1].Members = MemberNames;

      // array leegmaken zodat dit opnieuw kan worden gebruikt voor volgende squad
      MemberNames = []
    }

    let userRef = this.firestore.collection("Users").doc(uid);
    let data: any;

    // haal user data op
    await userRef.get().toPromise().then(function (doc) {

      data = doc.data();
      // console.log(data);

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });


    // plaats alle data in de current user service
    await this.currentUserService.getCurrentUser(
      uid,
      data.Firstname,
      data.Lastname,
      data.Email,
      squads
    ).finally(() => {

      // call trigger
      this.sqLoadTrigger.next(true);
      if (this.currentUserService.squads.length == 0) {
        this.noSqFound.next(true);
        console.log("no squad ")
      } else {
        this.noSqFound.next(false);
      }



    })



  }


  // methode om user data op te halen
  async getUserData(uid: string) {

    // squad data ophalen 
    let squads = [];
    let squadQuery = this.firebaseApp.firestore().collection('Squads').where("Members", "array-contains", uid)



    squadQuery.onSnapshot({ includeMetadataChanges: false }, (snapshot) => {
      snapshot.docChanges().forEach(element => {

        // dublele aray to get the id too
        if (element.type === "added") {

          squads.push([element.doc.id, element.doc.data()])


        }
        // dublele aray to get the id too
        if (element.type === "modified") {
          console.log("mod")
          for (let i: number = 0; i < squads.length; i++) {
            if (squads[i][0] == element.doc.id) {
              squads[i] = [element.doc.id, element.doc.data()]
              console.log(element.doc.data())
            }
          }




        }
        if (element.type === "removed") {

          for (let i: number = 0; i < squads.length; i++) {
            if (element.doc.id == squads[i][0]) {
              squads.splice(i, 1)
            }
          }



        }
      })


      // format the squad data into readable info
      this.formatData(uid, squads)

    })

  }

  logout() {
    localStorage.clear()
    this.firebaseAuth.auth.signOut();


  }

  getUser() {
    return this.firebaseAuth.auth.currentUser;

  }

  userDataRefresh(id) {





  }
}