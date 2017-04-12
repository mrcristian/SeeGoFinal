import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Apartamento } from "../../models/apartamento";
import { ApartamentoService } from "../../providers/apartamento-service";

import { Storage } from '@ionic/storage'
import { Propietario } from "../../models/propietario";
import { PropietarioService } from "../../providers/propietario-service";

/*
  Generated class for the AddApartamento page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-apartamento',
  templateUrl: 'add-apartamento.html'
})
export class AddApartamentoPage {

  propietario: Propietario;
  apartamento: Apartamento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceApar: ApartamentoService,
    public servicePro: PropietarioService,
    public storage: Storage,
    public loading: LoadingController,
    public toast: ToastController) {
    this.storage.get("propietario").then(val => {
      this.propietario = JSON.parse(val);
    });
    this.apartamento = new Apartamento();
  }

  ionViewDidEnter() {

  }

  addInmueble() {
    this.llenarDatosGenerales();
    this.serviceApar.agregarInmueble(this.apartamento).subscribe(responseApar => {
      this.apartamento._id = responseApar.idRegistrado;
      this.propietario.apartamentos.push(this.apartamento);
      this.actualizarPropietario();
    });
    this.navCtrl.pop();
  }
  llenarDatosGenerales() {
    this.apartamento.idPropietario = this.propietario.noIdentificacion;
    this.apartamento.telefono = this.propietario.telefono;
    this.apartamento.correo = this.propietario.correo;
    this.apartamento.visible = "si";
    this.apartamento.interesados = 0;
    this.apartamento.comentarios = [];
  }
  actualizarPropietario() {
    let loading = this.loading.create({ content: "Ingresando..." });
    loading.present();
    this.servicePro.actualizarPropietario(this.propietario.noIdentificacion, this.armarCuerpo()).subscribe(responsePro => {
      this.storage.set(this.propietario.tipo, JSON.stringify(this.propietario));
      loading.dismiss();
      this.toast.create({ message: "Apartamento agregado exitosamente", duration: 3000 }).present();
    });
  }
  armarCuerpo() {
    return {
      user: this.propietario.user,
      pass: this.propietario.pass,
      tipo: this.propietario.tipo,
      noIdentificacion: this.propietario.noIdentificacion,
      nombre: this.propietario.nombre,
      telefono: this.propietario.telefono,
      direccion: this.propietario.direccion,
      correo: this.propietario.correo,
      apartamentos: this.propietario.apartamentos
    }
  }
  // //Propietario
  // idPropietario: string;
  // telefono: string;
  // correo: string;
  // //Detalles        
  // _id:string;
  // costo: number;
  // sizeM2: number;
  // ubicacion: string;
  // descripcion: string;
  // serviciosBasicos: boolean;
  // internet: boolean;
  // alimentacion: boolean;
  // tv: boolean;
  // visible:boolean;
  // imagen: string;
  // //Comentarios e interesados
  // interesados:number;
  // comentarios:Comentario[]
}
