import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  currentUser: any;
  authChecked: boolean = false;
  credentials: {
    email?: string;
    password?: string;
  };

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone
  ) {
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(currentUser => {
      this.ngZone.run(() => {
        if (currentUser) {
          this.currentUser = currentUser;
        } else {
          this.currentUser = undefined;
        }

        this.authChecked = true;
      });
    });
  }

  doLogin(credentials): void {
    if (credentials.valid) {
      firebase.auth()
        .signInWithEmailAndPassword(credentials.value.email, credentials.value.password)
        .then(null, null);
    }
  }

  doLogout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
    }, (error) => {
      console.log(error);
    });
  }

}
