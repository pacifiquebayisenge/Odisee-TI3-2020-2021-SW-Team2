import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FirebaseApp } from '@angular/fire';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore, docChanges } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { CurrentUser } from './currentUser.service';

import { MatSnackBar } from '@angular/material/snack-bar';







@Injectable({
    providedIn: 'root'
})
export class CrudService {


    // Implementeerd angularfirestore en angularfireAuth
    constructor(
        public firebaseAuth: AngularFireAuth,
        public firestore: AngularFirestore,
        private currentUser: CurrentUser,
        public firebase: FirebaseApp,
        private snackbar: MatSnackBar,
        private authService: AuthService
    ) {

    }

    regSquadSucces: boolean;
    errOutput: string;

    refreshUserData = new BehaviorSubject<boolean>(false);

    // Methode die gebruikt wordt om een squad te registreren in de firebase
    async RegisterSquad(naam: string, members: Array<string>, icon: string) {
        console.log("crud register")
        let uid = this.currentUser.id

        // Voeg squad toe in de collectie
        await this.firestore.collection('Squads').add({
            Name: naam,
            Icon: icon,


        })
            .then(async docRef => {


                // current user toevoege in zelf gemaakte squad ----------------------------------------------------
                for (var i: number = 0; i < members.length; i++) {
                    //Doorloop de array en haal de UIDS op van de users

                    members[i] = await this.GetUserIDByEmail(members[i]["email"]);

                }
                // cuurent user automatisch toevoegen 
                members.push(uid)

                //Maak nieuwe collection Users in collection squad
                this.firestore.collection('Squads').doc(docRef.id).update({
                    Members: members
                })



                // nieuwe squad toevoegen aan lijst van squads van de user ----------------------------------------------------

                // haalt alle squads waar curent user deel van maakt
                let squads: Array<String> = await this.GetAllUserSquads(uid);


                // convert dubbele array naar sinlge array van enkel squads id's

                for (let i: number = 0; i < squads.length; i++) {
                    squads[i] = squads[i][0]

                }


                // voeg nieuwe squad toe
                //squads.push(docRef.id)

                //  terug naar database
                this.firestore.collection('Users').doc(uid).set({
                    Squads: squads
                }, {
                    merge: true
                });


                // verwelkom task bij iedere nieuwe task


                this.newTask(
                    docRef.id,
                    "Use this Awesome app 💯",
                    "This app is cool, why not use it everyday. Give it a high rating while you're at it. Especially if you're a teacher 😄",
                    "everyday",
                    this.currentUser.firstname + ' ' + this.currentUser.lastname,
                    "")


                // return status
                this.regSquadSucces = true;
                this.errOutput = "Squad succesfully created"

                // snackbar to show request response 
                this.snackbar.open('Squad succesfully created', null, {

                    duration: 2000,
                    panelClass: ['snackbar']
                });

                this.refreshUserData.next(true);

            })
            .catch(err => {
                console.log('Something went wrong:', err.message);
                console.log(err);

                // snackbar to show request response 
                this.snackbar.open('Squad could not be created: cannot add unregistered user', null, {
                    duration: 2000,
                    panelClass: ['snackbar']



                });;

                // return status
                this.regSquadSucces = false;
                this.errOutput = "Squad could not be created"
            });;
        // ???
        // console.log("registerquas")
    }



    // squad editten 
    async editSquad(squadData, membernames, squadId) {
        console.log("crud edit")
        let membersIDS: Array<string>;

        let squadRef = this.firestore.collection('Squads').doc(squadId)

        // get all the members
        await squadRef.get().toPromise()
            .then(function(doc) {

                // doc.data() is never undefined for query doc snapshots
                let data = doc.data()
                membersIDS = data.Members


            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });



        // add the new members
        for (let i: number = 0; i < squadData.members.length; i++) {

            let newMember = await this.GetUserIDByEmail(squadData.members[i].email)

            // werkt niet 

            if (!newMember) {
                this.snackbar.open('Cannot add unregistered user', null, {
                    duration: 2000,
                    panelClass: ['snackbar']
                })
            } else {
                membersIDS.push(newMember)
            }
        }

        if (membersIDS.length != 0) {
            await squadRef.set({
                Members: membersIDS
            }, { merge: true })
        }



        // update the squad name and icon
        await squadRef.update({
            Name: squadData.name,
            Icon: squadData.icon,


        }).then(() => {



            // snackbar to show request response 
            this.snackbar.open('Squad succesfully editted', null, {

                duration: 2000,
                panelClass: ['snackbar']
            });


            // return status
            this.regSquadSucces = true;
            this.errOutput = "Squad succesfully editted"
        })
            .catch(err => {
                console.log('Something went wrong:', err.message);
                console.log(err);

                // snackbar to show request response 
                this.snackbar.open('Squad could not be editted', null, {

                    duration: 2000,
                    panelClass: ['snackbar']
                });
                // return status
                this.regSquadSucces = false;
                this.errOutput = "Squad could not be editted"
            });;
    }


    // delete member form squad

    async deleteMember(squadId, memberId) {

        let SquadMembers: Array<string>
        let squadIds: Array<string>

        let squadRef = this.firestore.collection('Squads').doc(squadId);
        let userRef = this.firestore.collection('Users').doc(memberId);

        // get all squad data to put all members in array

        await squadRef.get().toPromise().then(function(doc) {
            if (doc.exists) {
                SquadMembers = doc.data().Members;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        // remove given member form that array 
        SquadMembers.splice(SquadMembers.indexOf(memberId), 1)

        // update squad with new filtred member array
        await squadRef.update({
            Members: SquadMembers
        }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

        // delete squad is in user list
        // get user squad id data to put in array
        await userRef.get().toPromise().then(function(doc) {
            if (doc.exists) {
                squadIds = doc.data().Squads;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });


        // remove given squad id from array

        squadIds.splice(squadIds.indexOf(squadId), 1)


        // update filtred list in users 
        await userRef.update({
            Squads: squadIds
        }).then(() => {
            // snackbar to show request response 
            this.snackbar.open('Member succesfully deleted', null, {

                duration: 2000,
                panelClass: ['snackbar']
            });
        }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    }



    async deleteSquad(squad) {

        let SquadMembers: Array<string>
        let squadIds: Array<string>

        let squadRef = this.firestore.collection('Squads').doc(squad[0]);
        let userRef = this.firestore.collection('Users').doc(this.currentUser.id);

        // delete squad id in user list
        // get user squad id data to put in array
        await userRef.get().toPromise().then(function(doc) {
            if (doc.exists) {
                squadIds = doc.data().Squads;
                console.log(squadIds)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });

        // remove given squad id from array
        for (let i: number = 0; i < squadIds.length; i++) {
            if (squadIds[i] == squad[0]) {
                squadIds.splice(squadIds.indexOf(squad[0]), 1)
            }

        }

        let Query = this.firestore.collection('/Users', ref => ref.where("Squads", 'array-contains', squad[0]));
        let Squads = [];
        await Query.get()
            .forEach(function(doc) {
                for (let i = 0; i < doc.docs.length; i++) {
                    // dublele aray to get the id too
                    Squads[i] = [doc.docs[i].id, doc.docs[i].data()]
                }
            })
        console.log(Squads)



        // update filtred list in users 
        await userRef.set({
            Squads: squadIds
        }, { merge: true }).catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });


        // delete all sub colletions
        await squadRef.collection("tasks").get().toPromise().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {

                squadRef.collection('tasks').doc(doc.id).delete()


            });
        });

        // delete the squad
        await squadRef.delete().then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });



        // snackbar to show request response 
        this.snackbar.open('Squad succesfully deleted', null, {

            duration: 2000,
            panelClass: ['snackbar']
        });
    }


    // Deze methode zoekt naar de mail in de database en returned de UID
    // Gebruikt async
    async GetUserIDByEmail(email: string) {

        let User = this.firestore.collection('/Users', ref => ref.where('Email', '==', email));
        let uid = "";

        await User.get()

            .forEach(function(doc) {

                if (!doc.empty) {
                    uid = doc.docs[0].id;
                    this.errOutput = 'succes'

                } else {
                    this.errOutput = 'Email not known'
                    this.regSquadSucces = false
                }



            }).catch(() => {

                this.errOutput = 'Email not known'
                this.regSquadSucces = false

            })


        if (uid == "" || uid == undefined) {
            this.errOutput = 'Email not known';
        }
        else {
            return uid;
        }

    }

    // Deze methode zoekt naar de firstname in de database en returned de firstname
    // Gebruikt async
    async GetUserFirstnameById(id: string) {

        let Query = this.firestore.collection('/Users', ref => ref.where("Id", '==', id));
        let names = [];
        await Query.get()
            .forEach(function(doc) {
                for (let i = 0; i < doc.docs.length; i++) {
                    // haal de firstname op
                    names = doc.docs[i].data().Firstname
                }
            })

        return names;

    }

    async GetUserLastnameById(id: string) {



        let Query = this.firestore.collection('/Users', ref => ref.where("Id", '==', id));

        let names = [];

        await Query.get()

            .forEach(function(doc) {

                for (let i = 0; i < doc.docs.length; i++) {

                    // haal de firstname op

                    names = doc.docs[i].data().Lastname

                }

            })



        return names;

    }

    // Haalt alle squads op van user
    async GetAllUserSquads(uid: string) {
        let Query = this.firestore.collection('/Squads', ref => ref.where("Members", 'array-contains', uid));
        let Squads = [];
        await Query.get()
            .forEach(function(doc) {
                for (let i = 0; i < doc.docs.length; i++) {
                    // dublele aray to get the id too
                    Squads[i] = [doc.docs[i].id, doc.docs[i].data()]
                }
            })

        return Squads;
    }


    //Haalt alle Users op van de squad
    GetAllSquadUsers(squadId: string) {
        let Query = this.firestore.collection('/Squads').doc(squadId);
        let members;

        Query.get().toPromise().then(function(doc) {
            if (doc.exists) {
                members = doc.data()["Members"];
            }
        });
        return members;
    }





    // task crud --------------------------------------------------------------------------

    taskSucces: boolean
    taskErr;
    taskdata;

    // Methode die gebruikt wordt om een task te registreren in de firebase
    async  newTask(squadId: string, title: string, description: string, repeat: String, assign: string, author: string) {
        // squad -> current squad -> tasks
        let taskRef = this.firestore.collection('Squads').doc(squadId).collection('tasks');

        // als autheur leeg is, zegge dat het systeem de taak geeft
        // dit enkel voor de eerste taak bij elke aangemaakte squad
        // om een verwelkom tasks weer te geven
        if (author == "") {
            author = "Uvods System"
        }



        let newTaskId
        //console.log(this.currentUser.squads)
        // Voeg task toe in de collectie
        await taskRef.add({
            Title: title,
            Description: description,
            Repeat: repeat,
            Assign: assign,
            Author: author,
            State: "Open",
            StartTime: [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()]

        })
            .then(async docRef => {


                newTaskId = docRef.id
                // return status
                this.taskSucces = true;
                this.taskErr = "task succesfully created"

                this.snackbar.open("task succesfully created", null, {
                    duration: 2000,
                    panelClass: ['snackbar']
                })



            })
            .catch(err => {
                console.log('Something went wrong:', err.message);

                // return status
                this.taskSucces = false;
                this.errOutput = "task could not be created"
                this.snackbar.open("task could not be created", null, {
                    duration: 2000,
                    panelClass: ['snackbar']
                })

            });

    }


    // get all tasks of squad 
    async getAllTasks(squadId: string) {
        let taskRef = this.firestore.collection('Squads').doc(squadId).collection('tasks');
        let task = [];

        await taskRef.get().forEach(function(doc) {
            for (let i = 0; i < doc.docs.length; i++) {
                task[i] = [doc.docs[i].id, doc.docs[i].data()]

            }
        });

        return task;
    }

    // Delete task van squad
    deleteTask(squadId: string, taskId: string) {

        this.firestore.collection('Squads').doc(squadId)
            .collection('tasks').doc(taskId)
            .delete()
            .then(function() {




                console.log("Document successfully deleted!");


            }).then(() => {
                this.snackbar.open('Document successfully deleted!', null, {
                    duration: 2000,
                    panelClass: ['snackbar']
                })
            });
    }

    // methode om tast state up te daten

    async updateTask(squadId: string, taskId: string) {
        let taskState;


        let taskRef = this.firestore.collection('Squads').doc(squadId).collection('tasks').doc(taskId);

        // haal task state  op
        await taskRef.get().toPromise().then((doc) => {
            taskState = doc.data().State

        })

        // wijzig task state naargelang vorige state
        if (taskState == "Open") {
            taskState = "Closed"

        } else {
            taskState = "Open"

        }

        // update state in database 
        await taskRef.update({
            State: taskState
        }).then(() => {

            console.log("Document successfully updated!");

            // pas task state ook aan lijst van task in current user
            for (let i = 0; i < this.currentUser.squads.length; i++) {
                if (squadId == this.currentUser.squads[i][0]) {
                    for (let j = 0; j < this.currentUser.squads[i][2].length; j++) {
                        if (taskId == this.currentUser.squads[i][2][j][0]) {
                            this.currentUser.squads[i][2][j]['1'].State = taskState

                        }
                    }
                }
            }
        })



    }

    async getAllTasksForOneUserPerSquad(squadId: string) {

        //let User = this.firestore.collection('/Users', ref => ref.where('Email', '==', email));
        let taskRef = this.firestore.collection('Squads').doc(squadId).collection('/tasks', ref =>
            ref.where('Assign', '==', this.currentUser.firstname + ' ' + this.currentUser.lastname));
        let task = [];

        await taskRef.get().forEach(function(doc) {
            for (let i = 0; i < doc.docs.length; i++) {
                task[i] = [doc.docs[i].id, doc.docs[i].data()]

            }
        });

        return task;
    }


    // edit existing task 
    async editTask(squadId: string, taskId: string, title: string, description: string, repeat: String, assign: string) {



        let taskRef = this.firestore.collection('Squads').doc(squadId).collection('tasks').doc(taskId);


        await taskRef.update({
            Title: title,
            Description: description,
            Repeat: repeat,
            Assign: assign
        })
            .then((doc) => {
                console.log("Document successfully edited!");


                // return status
                this.taskSucces = true;
                this.taskErr = "task succesfully edited"

                this.snackbar.open('task succesfully edited', null, {
                    duration: 2000,
                    panelClass: ['snackbar']
                })
            })
            .catch(err => {
                console.log('Something went wrong:', err.message);

                // return status
                this.taskSucces = false;
                this.errOutput = "task could not be edited"
                this.snackbar.open('task could not be edited', null, {
                    duration: 2000,
                    panelClass: ['snackbar']
                })

            });

    }

}