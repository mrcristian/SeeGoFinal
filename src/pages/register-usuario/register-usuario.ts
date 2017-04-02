import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import {RegisterPropietarioPage} from '../register-propietario/register-propietario';

import {EstudianteService} from '../../providers/estudiante-service';
import {Estudiante} from '../../models/estudiante';
/*
  Generated class for the RegisterUsuario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-register-usuario',
  templateUrl: 'register-usuario.html'
})
export class RegisterUsuarioPage {

  estudiante:Estudiante;

  constructor(public navCtrl: NavController, public navParams: NavParams, public service:EstudianteService) {
    this.estudiante = new Estudiante();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUsuarioPage');
  }
  // goPropietario(){
  //   this.navCtrl.setRoot(RegisterPropietarioPage)
  // }
  goUsuario(){
    
  }
  addUsuario(){    
    this.estudiante.tipo = "user";
    this.service.data.push(this.estudiante);
    this.navCtrl.pop();
  }
  exit(){

  }


}
