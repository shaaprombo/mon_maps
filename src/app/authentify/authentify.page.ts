import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook/ngx';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ActionSheetController,AlertController } from '@ionic/angular';

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
 
 dataUser_info = 
 {            password: '',
             email: '',
             nom:'',
             photo:''
};

  connected: boolean;
  userId: string;
  mail: string;
  method: any;
  inscrit=false;
  image='';
  imagePath: string;
  upload: any;

  constructor
  (
              public afAuth: AngularFireAuth,
              private navCtrl: NavController,
              public afDB: AngularFireDatabase,
              public alertController: AlertController,
              public loadingController: LoadingController,
              private camera: Camera,
              public afSG: AngularFireStorage,
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
  async addPhoto(source: string) {
    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraPhoto;
    } else {
      console.log('library');
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
    }
  }

  
async openLibrary() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  };
  return await this.camera.getPicture(options);
}

async openCamera() {
  const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetWidth: 1000,
    targetHeight: 1000,
    sourceType: this.camera.PictureSourceType.CAMERA
  };
  return await this.camera.getPicture(options);
}

async uploadFirebase() {
	const loading = await this.loadingController.create({
		duration: 2000
	});
  await loading.present();
  this.imagePath = 'monDossier/' + new Date().getTime() + '.jpg';
	this.upload = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
	this.upload.then(async () => {
		await loading.onDidDismiss();
		this.image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
		const alert = await this.alertController.create({
			header: 'Félicitation',
			message: 'L\'envoi de la photo dans Firebase est terminé!',
			buttons: ['OK']
		});
		await alert.present();
	});
  this.afDB.list('Users/').push({
    nom: this.dataUser_info.nom,
    adm:this.dataUser_info.email,
    ref:this.imagePath 
  });
 // this.valide=false;
 
  this.afAuth.createUserWithEmailAndPassword(this.dataUser_info.email, this.dataUser_info.password);
    this.dataUser = {
      email: '',
      password: ''
    };
    this.dataUser_info.nom='';
    this.dataUser_info.email='';
    this.dataUser_info.password='';
}

  doInscroption()
  {
        this.inscrit=true;  
  }
  login() {
    this.afAuth.signInWithEmailAndPassword(this.dataUser.email, this.dataUser.password);
     this.dataUser = {
       email: '',
       password: ''
     };
     this.dataUser.password='';
     this.dataUser.email='';
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
  this.fb.login(['email']).then( (response) => {
      const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);
      firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
          console.log('Info Facebook: ' + JSON.stringify(success));
          console.log('Firebase success: ' + JSON.stringify(success));
          console.log('uid: ' + success.user.uid);
          console.log('displayName: ' + success.user.displayName);
          console.log('photoURL: ' + success.user.photoURL);
          this.afDB.object('UsersF/' + success.user.uid).set({
            displayName: success.user.displayName,
            photoURL: success.user.photoURL,
            ide:success.user.email
          });
      }).catch((error) => {
          console.log('Erreur: ' + JSON.stringify(error));
      });
  }).catch((error) => { console.log(error); });
}

facebookWeb() {
  this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .then((success) => {
      console.log('Info Facebook: ' + JSON.stringify(success));
      console.log('Firebase success: ' + JSON.stringify(success));
    	console.log('uid: ' + success.user.uid);
    	console.log('displayName: ' + success.user.displayName);
      console.log('photoURL: ' + success.user.photoURL);
      this.afDB.object('UsersF/' + success.user.uid).set({
        displayName: success.user.displayName,
        photoURL: success.user.photoURL,
        ide:success.user.email
      });
    }).catch((error) => {
      console.log('Erreur: ' + JSON.stringify(error));
    });
}
}
