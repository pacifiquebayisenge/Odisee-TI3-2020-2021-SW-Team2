import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class Naming {

    private tittleSoruce = new BehaviorSubject<string>("No tittle");
    currentTittle = this.tittleSoruce.asObservable();

  

    changeTittle(tittle: string) {
        this.tittleSoruce.next(tittle)
    }


    constructor() { }


}