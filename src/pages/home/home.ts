import { Component, OnInit, NgZone } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';
import { Register } from '../register/register';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  user: any;
  authChecked: boolean = false;
  profilePicture: string;
  profileRef: any;
  credentials: {
    email?: string;
    password?: string;
  };

  constructor(
    public navCtrl: NavController,
    public ngZone: NgZone
  ) {
    this.credentials = {};
    this.profilePicture = undefined;
  }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(currentUser => {
      this.ngZone.run(() => {
        if (currentUser) {
          this.user = currentUser;

          this.profileRef = firebase.database().ref('profile/' + firebase.auth().currentUser.uid + '/profile_picture');
          this.profileRef.on('value', (snapshot) => this.updateImage(snapshot));
        } else {
          this.user = undefined;
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

  register() {
    this.navCtrl.push(Register);
  }


  updatePicture() {
    let userId: string = firebase.auth().currentUser.uid;

    Camera.getPicture({ quality: 50, allowEdit: true, cameraDirection: Camera.Direction.FRONT, destinationType: Camera.DestinationType.DATA_URL }).then((imageData) => {
      firebase.database().ref('profile/' + userId).update({ profile_picture: imageData });
    }, (err) => {
      console.error(err);
    });
  }

  updateImage(value) {
    if (value) {
      this.profilePicture = 'data:image/jpeg;base64,' + value.val();
    } else {
      this.profilePicture = undefined;
    }
  }

}
