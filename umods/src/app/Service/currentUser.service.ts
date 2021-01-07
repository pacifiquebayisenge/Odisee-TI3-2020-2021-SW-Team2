
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, BehaviorSubject } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { trigger } from '@angular/animations';



@Injectable({
    providedIn: 'root'
})

// current user interface to save logged in user
export class CurrentUser {


    // user data
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    squads: Array<string> = [];



    async getCurrentUser(id, fn, ln, em, sq) {
        this.id = id;
        this.firstname = fn;
        this.lastname = ln;
        this.email = em;
        this.squads = sq;




    }
    sqLoadTrigger = new BehaviorSubject<Array<string>>(this.squads);
    sqLoadListener = this.sqLoadTrigger.asObservable();



    // getter & setter firstname
    getId() {
        return this.id;
    }

    setId(id: string) {
        this.id = id;
    }

    // getter & setter firstname
    getFn() {
        return this.firstname;
    }

    setFn(fn: string) {
        this.firstname = fn;
    }

    // getter & setter lastname
    getLn() {
        return this.lastname;
    }

    setLn(ln: string) {
        this.lastname = ln;
    }

    // getter & setter email
    getEm() {
        return this.email;
    }

    setEm(em: string) {
        this.email = em;
    }

    // getter & setter squad list
    getSq() {
        return this.squads;
    }

    setSq(sq: string) {
        this.squads.push(sq)
    }






}