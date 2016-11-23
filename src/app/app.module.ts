import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Register } from '../pages/register/register';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "abcdefghij_klmnnopqrstuvxyzabcdefg-0h",
  authDomain: "firebase.firebaseapp.com",
  databaseURL: "https://firebase.firebaseio.com",
  storageBucket: "firebase.appspot.com",
  messagingSenderId: "123456789"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    Register
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Register
  ],
  providers: []
})
export class AppModule {

  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

}
