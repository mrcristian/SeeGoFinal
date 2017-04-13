import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController, ActionSheetController } from 'ionic-angular';
import { ApartamentoService } from '../../providers/apartamento-service';
import { Apartamento } from "../../models/apartamento";
import { Estudiante } from "../../models/estudiante";
import { Storage } from '@ionic/storage';
import { AddComentarioPage } from "../add-comentario/add-comentario";
import { LoginPage } from "../login/login";


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
  me: Estudiante;
  datoABuscar: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceApart: ApartamentoService,
    public loading: LoadingController,
    public storage: Storage,
    public toast: ToastController,
    public alert: AlertController,
    public actionsheetCtrl: ActionSheetController) {
    this.datoABuscar = "";
    this.apartamentos = [];
    this.storage.get("user").then(val => {
      this.me = JSON.parse(val);
    });
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
      loading.dismiss();
      this.apartamentos = response.data;
    });
  }
  consultarBajoCosto() {
    let loading = this.loading.create({
      content: "Consultando apartamentos..."
    });
    loading.present();
    this.serviceApart.getBajoElCosto(this.datoABuscar).subscribe(response => {
      loading.dismiss();
      this.apartamentos = response.data;
    });
  }
  consultarBajoElEspacio() {
    let loading = this.loading.create({
      content: "Consultando apartamentos..."
    });
    loading.present();
    this.serviceApart.getBajoElEspacio(this.datoABuscar).subscribe(response => {
      loading.dismiss();
      this.apartamentos = response.data;
    });
  }
  verContacto(event, apartamento) {
    this.toast.create({ message: "Puedes comunicarte con el propietario mediante \n " + "Correo: " + apartamento.correo + "\n" + " Telefono: " + apartamento.telefono, duration: 4000 }).present();
  }
  addComentario(event, apartamento) {
    this.navCtrl.push(AddComentarioPage, { miApartamento: apartamento, productor: this.me.nombre });
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
          icon: 'md-wifi',
          handler: () => {
            if (apartamento.internet == "si")
              this.mostrarAlerta("El inmueble si posee servicio de internet");
            else
              this.mostrarAlerta("El inmueble no posee servicio de internet");
          }
        },
        {
          text: '¿ Posee alimentación ?',
          icon: 'md-restaurant',
          handler: () => {
            if (apartamento.alimentacion == "si")
              this.mostrarAlerta("El inmueble si posee servicio de alimentación");
            else
              this.mostrarAlerta("El inmueble no posee servicio de alimentación");
          }
        },
        {
          text: '¿ Posee servicio de TV ? ',
          icon: 'md-desktop',
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
  mostrarAlerta(mensaje) {
    let alert = this.alert.create({
      title: 'Detalle',
      subTitle: mensaje,
      buttons: ['OK']
    });
    alert.present();
  }
  abrirMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Acciones',
      buttons: [
        {
          text: 'Cargar todos los inmuebles',
          icon: 'md-refresh',
          handler: () => {
            this.cargarApartamentos();
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
  realizarConsulta() {
    switch (this.criterio) {
      case "ninguno": {
        this.cargarApartamentos();
        break;
      }
      case "costo": {
        this.consultarBajoCosto();
        break;
      }
      case "tamaño": {
        this.consultarBajoElEspacio();
        break;
      }
    }
  }
}
