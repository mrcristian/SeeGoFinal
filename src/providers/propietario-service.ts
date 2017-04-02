import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Propietario } from '../models/propietario'; 

/*
  Generated class for the PropietarioData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PropietarioService {

  data: Propietario[];
  constructor(public http: Http) {
  }
  loadData() {
    this.data = [
      {
        user: "pablo",
        pass: "123",
        tipo: "propietario",
        noIdentificacion: "202020",
        nombre: "pablo",
        telefono: "3213213112",
        direccion: "cra2",
        correo: "pablo@gmail.com",
        apartamentos: [{
          idPropietario: "100",
          telefono: "3213214325",
          correo: "p1@gmail.com",
          departamentoId: 100,
          costo: 600000,
          tamañoM2: 7,
          ubicacion: "Calle 1 # 10-14",
          descripcion: "Apartamento comodo para pareja",
          serviciosBasicos: true,
          internet: false,
          alimentacion: true,
          tv: false,
          imagen: "http://images.locanto.com.co/1146921655/HERMOSOS-Y-MODERNOS-APARTAMENTOS-Y-APARTAESTUDIOS-PARA-LA-VENTA_3.jpg",
          interesados: 2,
          comentarios: [{ productor: "pedro", descripcion: "bueno", fecha: new Date("02/02/2000") }]
        }]
      }
      //TENER CUIDADO EN EL MOMENTO DE CARGAR Y ASIGNAR APARTAMENTOS 
    ];
  }
  validar(user: string, pass: string): Propietario {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].user == user && this.data[i].pass == pass)
        return this.data[i];
    }
    return null;
  }

}
