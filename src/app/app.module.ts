import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Facebook } from '@ionic-native/facebook/ngx';

import { Camera } from '@ionic-native/camera/ngx';



export const firebaseConfig = {
  apiKey: "AIzaSyCMcjHSvQMj8Or0Pp_SlVYQCC5XjoIb_lc",
  authDomain: "tobobus-fda4a.firebaseapp.com",
  databaseURL: "https://tobobus-fda4a.firebaseio.com",
  projectId: "tobobus-fda4a",
  storageBucket: "tobobus-fda4a.appspot.com",
  messagingSenderId: "860910229209",
  appId: "1:860910229209:web:4981ee3ba9e6d838bbd0c8",
  measurementId: "G-QLV7S72NEE"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
       BrowserModule, 
       IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireStorageModule
      ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
