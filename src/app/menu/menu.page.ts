import { Component, OnInit } from '@angular/core';
import {  Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavParams } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  
trajet = 
{
  debut: '',
  fin: '',
  dte:'',
  prix: '',
  nbre_place:'',
  adm:'',
  key:''


};
email='';
agences_photo='';
agences_email='';
agence_slogan='';
agence_nom='';
trajets=[];
personne='';
modify=false;

  constructor( 
    public afDB: AngularFireDatabase,
    private navCtrl: NavController,
    private route: ActivatedRoute) 
  { 
   this.email = route.snapshot.params['item'];
   this.agences_photo=route.snapshot.params['agencess'];
   this.agences_email=route.snapshot.params['item1'];
   this.agence_nom=route.snapshot.params['item2'];
   this.agence_slogan=route.snapshot.params['item3'];
   this.personne=route.snapshot.params['item4'];

   this.getTrajets();
   
  }

  ngOnInit() {
  }
 
  page_trjet() {

    this.navCtrl.navigateForward(['/trajet', {item5:this.email,item6: this.agences_photo}]);
 
  }

  
getTrajets() {
	this.afDB.list('Trajets/').snapshotChanges(['child_added'])
	.subscribe(actions => {
		this.trajets = [];
    
		actions.forEach(action => {
			this.trajets.push({
  debut: action.payload.exportVal().debut,
  fin:action.payload.exportVal().fin,
  dte: action.payload.exportVal().dte,
  prix: action.payload.exportVal().prix,
  nbre_place:action.payload.exportVal().nbre_place,
  adm:action.payload.exportVal().adm,
  key:action.payload.key
  

				
			});
		}
);
	});
}

deleteReserve(trajet){
  this.afDB.list('/Trajets').remove(trajet.key);
  this.getTrajets();
}


updateTrajet(trajet){
  this.afDB.list('/Trajet').update(trajet.key, {
    debut: trajet.debut,
    fin: trajet.fin,
    dte: trajet.dte,
    prix: trajet.prix,
    nb_place: trajet.nbre_place,
    adm:trajet.adm
  });
}
}
