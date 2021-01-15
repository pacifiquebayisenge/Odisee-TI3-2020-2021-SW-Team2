import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Naming } from '../service/page.service';
import { Forms } from '../service/forms.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CurrentUser } from '../service/currentUser.service'


@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
  providers: [Naming]
})
export class MainNavComponent implements OnChanges, OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private service: Naming,
    private dialog: MatDialog,
    public formService: Forms,
    public currentUserService: CurrentUser
  ) { }




  userfirstname: string;
  userlastname: string;

  squadCount: number = 0;




  tittle: string;

  ngOnChanges(changes: SimpleChanges) {


    console.log(changes['squadCount'])

  }

  squadNumber() {
    this.squadCount = this.currentUserService.squads.length
  }
  ngOnInit() {

    this.userfirstname = this.currentUserService.firstname
    this.userlastname = this.currentUserService.lastname
    //this.squadCount = this.currentUserService.squads.length

    // pagina titel
    this.service.currentTittle.subscribe(tittle => this.tittle = tittle)

    //console.log(this.currentUserService.squads.length)
  }

  createSquad() {
    this.formService.squadPopup()
  }

  editSquad() {
    this.formService.editSquad = true;
    this.formService.squadPopup()

  }

  deleteSquad() {
    this.formService.deleteSquad = true;


    this.formService.squadPopup()
  }




}
