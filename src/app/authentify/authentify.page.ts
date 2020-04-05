import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentify',
  templateUrl: './authentify.page.html',
  styleUrls: ['./authentify.page.scss'],
})
export class AuthentifyPage implements OnInit {


  providerFb: firebase.auth.FacebookAuthProvider;

  dataUser = 
  {
              email: '',
              password: ''
 };

  connected: boolean;
  userId: string;
  mail: string;
  method: any;

  constructor
  (
              public afAuth: AngularFireAuth,
              private navCtrl: NavController,
              public afDB: AngularFireDatabase,
              private router: ActivatedRoute,
              private fb: Facebook,
              private route: Router,
              public platform: Platform
  ) 
  { 

    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.connected = true;
        this.userId = auth.uid;
        this.mail = auth.email;
        this.method = auth.providerData[0].providerId;
        this.navCtrl.navigateForward(['/home', {item:auth.email,meth:this.method}]);
        
       
        
      }
    });

  }

  ngOnInit() {
    
  }
  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
     this.dataUser = {
       email: '',
       password: ''
     };
  }
  signUp() {
    this.afAuth.createUserWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
 }
logout() {
  this.afAuth.signOut();

}
facebookLogin() {
  if (this.platform.is('cordova')) {
    console.log('PLateforme cordova');
    this.facebookCordova();
  } else {
    console.log('PLateforme Web');
    this.facebookWeb();
  }
}
facebookCordova() {
  this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((success) => {
      console.log('Info Facebook: ' + JSON.stringify(success));
      console.log('Firebase success: ' + JSON.stringify(success));
    	console.log('uid: ' + success.user.uid);
    	console.log('displayName: ' + success.user.displayName);
      console.log('photoURL: ' + success.user.photoURL);
      this.afDB.object('Users/' + success.user.uid).set({
        displayName: success.user.displayName,
        photoURL: success.user.photoURL,
        ide:success.user.email
      });
    }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
  
}

facebookWeb() {
  this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((success) => {
      console.log('Info Facebook: ' + JSON.stringify(success));
      console.log('Firebase success: ' + JSON.stringify(success));
    	console.log('uid: ' + success.user.uid);
    	console.log('displayName: ' + success.user.displayName);
      console.log('photoURL: ' + success.user.photoURL);
      this.afDB.object('Users/' + success.user.uid).set({
        displayName: success.user.displayName,
        photoURL: success.user.photoURL,
        ide:success.user.email
      });
    }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
}
}
