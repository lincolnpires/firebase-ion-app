import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import firebase from 'firebase';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class Register {
  public fireAuth: any;
  public userProfile: any;
  submitted = false;
  credentials: { email?: string, password?: string } = {};

  constructor(public navCtrl: NavController) {
    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('/profile');
  }

  doRegister(_credentials) {
    this.submitted = true;

    this.fireAuth.createUserWithEmailAndPassword(_credentials.value.email, _credentials.value.password).then((newUser) => {
      this.fireAuth.signInWithEmailAndPassword(_credentials.value.email, _credentials.value.password).then((authenticatedUser) => {
        this.userProfile.child(authenticatedUser.uid).set({
          email: _credentials.value.email
        }).then(() => {
          this.navCtrl.setRoot(HomePage);
        });
  
      })
    }, (e) => {
      console.log(e)
    });
  }
}
