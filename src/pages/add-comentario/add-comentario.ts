import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Comentario } from "../../models/comentario";
import { Apartamento } from "../../models/apartamento";
import { ApartamentoService } from "../../providers/apartamento-service";

/*
  Generated class for the AddComentario page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-comentario',
  templateUrl: 'add-comentario.html'
})
export class AddComentarioPage {
  
  comentarios: Comentario[];
  apartamentoAux: Apartamento;
  fechaActual: Date;
  productor: string;
  descripcion: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public serviceApart: ApartamentoService,
    public loading: LoadingController,
    public toast: ToastController) {   
    this.fechaActual = new Date();
    this.productor = navParams.get('productor');
    this.apartamentoAux = navParams.get('miApartamento');
    this.comentarios = this.apartamentoAux.comentarios;    
  }

  ionViewDidEnter() {
    this.comentarios = this.apartamentoAux.comentarios;
  }
  addComentario() {
    var comentario:Comentario;
    comentario = new Comentario();
    this.fechaActual = new Date();

    var year = this.fechaActual.getFullYear();
    var month = this.fechaActual.getMonth();
    var day = this.fechaActual.getDay();

    comentario.productor = this.productor;
    comentario.fecha = this.tratarFecha(year, month, day);
    comentario.descripcion = this.descripcion;

    this.apartamentoAux.comentarios.push(comentario);    
    
    this.actualizarInmueble(", ha sido comentado");
  }
  exit() {
    this.navCtrl.pop();
  }

  actualizarInmueble(detalles) {
    let loading = this.loading.create({ content: "Actualizando..." });
    loading.present();
    this.serviceApart.actualizarInmueble(this.apartamentoAux._id, this.armarCuerpoInmueble()).subscribe(responsePro => {
      // this.storage.set(this.propietario.tipo, JSON.stringify(this.propietario));
      loading.dismiss();
      this.toast.create({ message: "Inmueble actualizado exitosamente" + detalles, duration: 3000 }).present();
    });
  }
  armarCuerpoInmueble() {
    return {
      //Propietario
      idPropietario: this.apartamentoAux.idPropietario,
      telefono: this.apartamentoAux.telefono,
      correo: this.apartamentoAux.correo,
      //Detalles       
      // _id: string,
      costo: this.apartamentoAux.costo,
      size: this.apartamentoAux.size,
      ubicacion: this.apartamentoAux.ubicacion,
      descripcion: this.apartamentoAux.descripcion,
      serviciosBasicos: this.apartamentoAux.serviciosBasicos,
      internet: this.apartamentoAux.internet,
      alimentacion: this.apartamentoAux.alimentacion,
      tv: this.apartamentoAux.tv,
      visible: this.apartamentoAux.visible,
      imagen: this.apartamentoAux.imagen,
      //Comentarios e interesados
      interesados: this.apartamentoAux.interesados,
      comentarios: this.apartamentoAux.comentarios
    }
  }
  tratarFecha(year: number, month: number, day: number) {
    var aux = "";
    switch (month) {
      case 1: { aux = "Enero";break; }
      case 2: { aux = "Febrero";break; }
      case 3: { aux = "Marzo";break; }
      case 4: { aux = "Abril";break; }
      case 5: { aux = "Mayo";break; }
      case 6: { aux = "Junio";break; }
      case 7: { aux = "Julio";break; }
      case 8: { aux = "Agosto";break; }
      case 9: { aux = "Septiembre";break; }
      case 10: { aux = "Octubre";break; }
      case 11: { aux = "Noviembre";break; }
      case 12: { aux = "Diciembre";break; }
    }
    return day+" de "+aux+" del "+year;
  }

}
