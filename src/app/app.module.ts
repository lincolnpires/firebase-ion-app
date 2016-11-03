import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Register } from '../pages/register/register';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAu5Yp_rhibJfpRpVIfmrQAblUyTlcY-4M",
  authDomain: "fir-ion-app.firebaseapp.com",
  databaseURL: "https://fir-ion-app.firebaseio.com",
  storageBucket: "fir-ion-app.appspot.com",
  messagingSenderId: "251870675171"
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
