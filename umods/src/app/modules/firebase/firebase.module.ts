import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../../environments/environment';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireMessagingModule,
  ],
  exports: [
    CommonModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
  ], 
  providers: [
    AngularFirestore
  ]
})
export class FirebaseModule { 
  
}
