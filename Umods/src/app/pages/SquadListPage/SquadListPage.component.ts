import { Component, OnInit, HostListener } from '@angular/core';
import { Naming } from '../../service/page.service';
import { CurrentUser } from '../../service/currentUser.service';
import { Forms } from '../../service/forms.service'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'SquadListPage',
  templateUrl: './SquadListPage.component.html',
  styleUrls: ['./SquadListPage.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('.5s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class SquadListPageComponent implements OnInit {

  pageTittle: string = "Squad List";
  countSquads: number = 0;
  noSquadFound: boolean;

  mySubscription: any;

  constructor(
    public service: Naming,
    private formService: Forms,
    public currentUser: CurrentUser,
    private router: Router,
    private authService: AuthService,
    private crudService: CrudService
  ) {



  }





  // all squads where current user is part of
  squads: Array<any>;
  squadLoaded: boolean = false


  createSquad() {
    this.formService.squadPopup()

  }

  ngOnDestroy() {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }



  // navigate to squad page
  route(id: string) {

    // wait 0.3s for the animation
    setTimeout(() => {
      console.log(id[0])
      this.router.navigate(['/squad-page', id[0]])

    }, 300);


  }




  async ngOnInit() {




    //this.authService.userDataRefresh(this.currentUser.id)

    // method to change page tittle to the page name
    this.service.changeTittle(this.pageTittle)
    //await this.authService.getUserData(this.currentUser.id)

    // get the trigger from auth en listen to it
    this.authService.noSqFound.asObservable().subscribe(() => {
      this.noSquadFound = this.authService.noSqFound.value;
    })

    this.authService.sqLoadTrigger.asObservable().subscribe(obs => {
      this.squads = []


      this.squads = this.currentUser.squads
      this.countSquads = this.currentUser.squads.length


    })

    this.formService.closeSquadForm.next(true);

  }



}