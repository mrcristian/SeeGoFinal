import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Apartamento } from "../../models/apartamento";

/*
  Generated class for the Detalles page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detalles',
  templateUrl: 'detalles.html'
})
export class DetallesPage {

  apartamento:Apartamento;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.apartamento=this.navParams.get('model');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesPage');
  }
  algo(){    
  }

}
