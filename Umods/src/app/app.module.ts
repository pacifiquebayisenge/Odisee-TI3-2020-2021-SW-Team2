import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// pages
import { CalenderPageComponent } from './pages/CalenderPage/CalenderPage.component';
import { OverviewPageComponent } from './pages/OverviewPage/OverviewPage.component';
import { SquadListPageComponent } from './pages/SquadListPage/SquadListPage.component';
import { SquadPageComponent } from './pages/SquadPage/SquadPage.component';

// components
import { SquadContainerComponent } from './pages/SquadListPage/Components/squad-container/squad-container.component';
import { DynamicComponent } from './dynamic/dynamic.component';
import { MainNavComponent } from './main-nav/main-nav.component';

// forms popup components
import { LoginFormComponent } from './popups/login-form/login-form.component';
import { TaskFormComponent } from './popups/task-form/task-form.component';
import { RegisterFormComponent } from './popups/register-form/register-form.component';
import { SquadFormComponent } from './popups/squad-form/squad-form.component';

// material module for material componenets
import { MaterialModule } from './modules/material/material.module';

// Firebase module for Firebase componenets
import { FirebaseModule } from './modules/firebase/firebase.module';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';


// services
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/authGuardService.service'
import { Forms } from './service/forms.service';
import { CurrentUser } from './service/currentUser.service';
import { Icons } from './service/icons.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { Naming } from './Service/page.service';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule'











@NgModule({
  declarations: [
    AppComponent,
    SquadListPageComponent,
    DynamicComponent,
    SquadContainerComponent,
    SquadPageComponent,
    CalenderPageComponent,
    LoginFormComponent,
    TaskFormComponent,
    RegisterFormComponent,
    SquadFormComponent,
    MainNavComponent,
    OverviewPageComponent





  ],
  imports: [
    BrowserModule,
    // Firebase
    FirebaseModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFirestoreModule,


    // material
    MaterialModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,


    RouterModule.forRoot([
      //AuthguardService kijkt of user is ingelogd, Zo nee redirect naar login pagina
      { path: '', component: SquadListPageComponent, canActivate: [AuthGuardService] },
      { path: 'calender-page', component: CalenderPageComponent, canActivate: [AuthGuardService] },
      { path: 'overview-page', component: OverviewPageComponent, canActivate: [AuthGuardService] },
      { path: 'squad-page/:squadId', component: SquadPageComponent, canActivate: [AuthGuardService] },
      { path: '**', component: SquadListPageComponent, canActivate: [AuthGuardService] },
    ], { relativeLinkResolution: 'legacy' }),


    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),


    ScheduleModule, RecurrenceEditorModule,



  ],

  providers: [
    AuthService,
    Forms,
    AuthGuardService,
    CurrentUser,
    Icons,
    AngularFirestoreModule,
    AngularFirestore,
    //calandar
    DayService,
    WeekService,
    WorkWeekService,
    MonthService,
    MonthAgendaService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SquadFormComponent]
})
export class AppModule {


} 
