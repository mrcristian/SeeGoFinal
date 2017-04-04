import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApartamentoService } from '../../providers/apartamento-service';
import { Apartamento } from "../../models/apartamento";


/*
  Generated class for the HomeEstudiante page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-estudiante',
  templateUrl: 'home-estudiante.html'
})
export class HomeEstudiantePage {

  apartamentos: Apartamento[];
  criterio: string;
  filtro: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public serviceApart: ApartamentoService,
    public loading: LoadingController) {
    this.apartamentos = [];
  }

  ionViewDidLoad() {
    this.cargarApartamentos();    
  }
  cargarApartamentos() {
    let loading = this.loading.create({
      content: "Cargando apartamentos..."
    });    
    loading.present();
    this.serviceApart.getDisponibles().subscribe(response => { 
      console.log(response)
      loading.dismiss();
      this.apartamentos = response.data;
      console.log(this.apartamentos); });
  }

}
