import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { HomeEstudiantePage } from '../home-estudiante/home-estudiante';
import { RegisterPage } from '../register/register';
import { EstudianteService } from '../../providers/estudiante-service';
import { AlertController } from 'ionic-angular';
import { PropietarioService } from "../../providers/propietario-service";


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  user: string;
  pass: string;
  tipo: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceEst: EstudianteService,
    public servicePro: PropietarioService,
    public alertCtrl: AlertController,
    public toast: ToastController,
    public loading: LoadingController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
  login() {
    let loading = this.loading.create({
      content: "Cargando..."
    });
    loading.present();
    this.serviceEst.validar(this.user, this.pass).subscribe(res => {
      if (res.success) {
        loading.dismiss();
        this.goHome(res.user.tipo);
      }
      else {
        this.servicePro.validar(this.user, this.pass).subscribe(res => {
          loading.dismiss();
          if (res.success) {
            this.goHome(res.user.tipo);
          }
          else {
            this.showAlert();
          }
        });
      }
    });
  }
  goHome(tipo: string) {
    switch (tipo) {
      case "user":
        {
          this.navCtrl.setRoot(HomeEstudiantePage);
          break;
        }
      case "propietario": {
        console.log("Cargar pagina de propietario");
      }
    }
  }
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Lo sentimos...',
      subTitle: 'Tu usuario o contraseña no son validos',
      buttons: ['OK']
    });
    alert.present();
  }


}
