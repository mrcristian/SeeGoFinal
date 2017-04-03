import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { EstudianteService } from '../../providers/estudiante-service';
import { PropietarioService } from '../../providers/propietario-service';
import { Estudiante } from "../../models/estudiante";
import { Propietario } from "../../models/propietario";

/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

  tipoUsuario: string;
  estudiante: Estudiante;
  propietario: Propietario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceEst: EstudianteService,
    public serviceProp: PropietarioService,
    public loading: LoadingController,
    public toast: ToastController) {
    this.estudiante = new Estudiante();
    this.propietario = new Propietario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  addUsuario() {
    this.estudiante.tipo = "user";
    let loading = this.loading.create({ content: "Ingresando..." });
    loading.present();
    this.serviceEst.registrar(this.estudiante).subscribe(response => {
      loading.dismiss();
      this.toast.create({ message: response.message, duration: 3000 }).present();
    });
    this.navCtrl.pop();
  }
  addPropietario() {
    this.propietario.tipo = "propietario";
    let loading = this.loading.create({ content: "Ingresando..." });
    loading.present();
    this.serviceProp.registrar(this.propietario).subscribe(response => {
      loading.dismiss();
      this.toast.create({ message: response.message, duration: 3000 }).present();
    });
    this.navCtrl.pop();
  }
  exit() {
    this.navCtrl.pop();
  }

}
