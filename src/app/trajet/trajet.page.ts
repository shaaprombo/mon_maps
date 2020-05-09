import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-trajet',
  templateUrl: './trajet.page.html',
  styleUrls: ['./trajet.page.scss'],
})
export class TrajetPage implements OnInit {
   key='';
   email='';
    
trajet = 
{
  debut: '',
  fin: '',
  dte:'',
  prix: '',
  nbre_place:'',
  adm:'',
  key:''


}
photo='';
  constructor(
     public afDB: AngularFireDatabase,
     private route: ActivatedRoute)
   {
    this.key = route.snapshot.params['item4'];
    this.email = route.snapshot.params['item5'];
    this.photo = route.snapshot.params['item6'];

  }

  ngOnInit() {
  }
  updateTrajet(){
    this.afDB.list('/Trajets').update(this.key, {
      debut: this.trajet.debut,
      fin: this.trajet.fin,
      dte: this.trajet.dte,
      prix: this.trajet.prix,
      nb_place:this.trajet.nbre_place,
      adm:this.email
    });
    this.trajet.debut='';
    this.trajet.fin='';
    this.trajet.dte='';
    this.trajet.prix='';
    this.trajet.nbre_place='';

  }

  add_trajets() {
    this.afDB.list('Trajets/').push({
      debut: this.trajet.debut,
      fin:this.trajet.fin,
      dte:this.trajet.dte,
      prix:this.trajet.prix,
      nbre_place:this.trajet.nbre_place,
      adm:this.email
  
    });
   
    this.trajet.debut;
      this.trajet.fin='';
      this.trajet.dte='';
      this.trajet.prix='';
      this.trajet.nbre_place='';
  
  
  }

}
