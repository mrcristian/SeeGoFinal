import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { Apartamento } from "../../models/apartamento";
import { ApartamentoService } from "../../providers/apartamento-service";
import { Propietario } from "../../models/propietario";

import { Storage } from '@ionic/storage'
import { AddApartamentoPage } from "../add-apartamento/add-apartamento";
import { PropietarioService } from "../../providers/propietario-service";
import { LoginPage } from "../login/login";
import { AddComentarioPage } from "../add-comentario/add-comentario";

/*
  Generated class for the HomePropietario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home-propietario',
  templateUrl: 'home-propietario.html'
})
export class HomePropietarioPage {

  me: Propietario;
  apartamentos: Apartamento[];
  apartamento: Apartamento;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public serviceApart: ApartamentoService,
    public servicePro: PropietarioService,
    public storage: Storage,
    public toast: ToastController,
    public actionsheetCtrl: ActionSheetController,
    public alert: AlertController) {
    this.me = new Propietario();
    this.apartamentos = [];
    this.apartamento = new Apartamento();
    this.storage.get("propietario").then(val => {
      this.me = JSON.parse(val);
    });
  }

  ionViewDidEnter() {
    this.cargarMisInmuebles();
  }
  goToAddApartamento() {
    this.navCtrl.push(AddApartamentoPage);
  }
  doRefresh(refresher) {
    this.serviceApart.getMisInmuebles(this.me.noIdentificacion).subscribe(response => {
      this.apartamentos = response.data;
      this.me.apartamentos = this.apartamentos;
      refresher.complete();
    });
  }
  cargarMisInmuebles() {
    let loading = this.loading.create({
      content: "Cargando mis inmuebles..."
    });
    loading.present();
    this.serviceApart.getMisInmuebles(this.me.noIdentificacion).subscribe(response => {
      this.apartamentos = response.data;
      this.me.apartamentos = this.apartamentos;
      loading.dismiss();
    });
  }
  ocultarORevelarInmueble(event, apartamento) {
    this.apartamento = apartamento;
    let mensaje = "";
    if (this.apartamento.visible == "si") {
      this.apartamento.visible = "no";
      mensaje = " ahora esta oculto";
    }
    else {
      this.apartamento.visible = "si";
      mensaje = " ahora esta revelado"
    }
    this.actualizarInmueble(mensaje);

  }
  actualizarInmueble(detalles) {
    let loading = this.loading.create({ content: "Actualizando..." });
    loading.present();
    this.serviceApart.actualizarInmueble(this.apartamento._id, this.armarCuerpoInmueble()).subscribe(responsePro => {
      // this.storage.set(this.propietario.tipo, JSON.stringify(this.propietario));
      loading.dismiss();
      this.toast.create({ message: "Inmueble actualizado exitosamente" + detalles, duration: 3000 }).present();
    });
    this.cargarMisInmuebles();
  }
  armarCuerpoInmueble() {
    return {
      //Propietario
      idPropietario: this.apartamento.idPropietario,
      telefono: this.apartamento.telefono,
      correo: this.apartamento.correo,
      //Detalles       
      // _id: string,
      costo: this.apartamento.costo,
      size: this.apartamento.size,
      ubicacion: this.apartamento.ubicacion,
      descripcion: this.apartamento.descripcion,
      serviciosBasicos: this.apartamento.serviciosBasicos,
      internet: this.apartamento.internet,
      alimentacion: this.apartamento.alimentacion,
      tv: this.apartamento.tv,
      visible: this.apartamento.visible,
      imagen: this.apartamento.imagen,
      //Comentarios e interesados
      interesados: this.apartamento.interesados,
      comentarios: this.apartamento.comentarios
    }
  }
  abrirMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Acciones',
      buttons: [
        {
          text: 'Actualizar lista de inmuebles',
          icon: 'md-refresh',
          handler: () => {
            this.cargarMisInmuebles();
          }
        },
        {
          text: 'Cerrar sesión',
          icon: 'md-exit',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
  verDetalles(event, apartamento) {
    // this.navCtrl.push(DetallesPage,{model:apartamento})
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Detalles',
      buttons: [
        {
          text: '¿ Qué precio tiene el arrendo ?',
          icon: 'md-cash',
          handler: () => {
            this.mostrarAlerta("El arrendo cuesta: " + apartamento.costo);
          }
        },
        {
          text: '¿ cuál es el tamaño ? ',
          icon: 'md-cube',
          handler: () => {
            this.mostrarAlerta("El apartamento tiene: " + apartamento.size + " m2")
          }
        },
        {
          text: '¿ Cubre servicios basicos ?',
          icon: 'md-water',
          handler: () => {
            if (apartamento.serviciosBasicos == "si")
              this.mostrarAlerta("El inmueble si cubre servicios basicos");
            else
              this.mostrarAlerta("El inmueble no cubre servicios basicos");
          }
        },
        {
          text: '¿ Posee internet ?',
          icon:'md-wifi',
          handler: () => {
            if (apartamento.internet == "si")
              this.mostrarAlerta("El inmueble si posee servicio de internet");
            else
              this.mostrarAlerta("El inmueble no posee servicio de internet");
          }
        },
        {
          text: '¿ Posee alimentación ?',
          icon:'md-restaurant',
          handler: () => {
            if (apartamento.alimentacion == "si")
              this.mostrarAlerta("El inmueble si posee servicio de alimentación");
            else
              this.mostrarAlerta("El inmueble no posee servicio de alimentación");
          }
        },
        {
          text: '¿ Posee servicio de TV ? ',
          icon:'md-desktop',
          handler: () => {
            if (apartamento.tv == "si")
              this.mostrarAlerta("El inmueble si posee servicio de televisión");
            else
              this.mostrarAlerta("El inmueble no posee servicio de televisión");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }

  addComentario(event,apartamento){
    this.navCtrl.push(AddComentarioPage,{miApartamento:apartamento,productor:this.me.nombre});
  }

  mostrarAlerta(mensaje) {
    let alert = this.alert.create({
      title: 'Detalle',
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }

}
