import { Injectable } from '@angular/core';
import { Http, RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Propietario } from '../models/propietario';
import { Observable } from "rxjs/Observable";
import { URL } from '../app/app.config';

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
    // this.data = [
    //   {
    //     user: "pablo",
    //     pass: "123",
    //     tipo: "propietario",
    //     noIdentificacion: "202020",
    //     nombre: "pablo",
    //     telefono: "3213213112",
    //     direccion: "cra2",
    //     correo: "pablo@gmail.com",
    //     apartamentos: [{
    //       idPropietario: "100",
    //       telefono: "3213214325",
    //       correo: "p1@gmail.com",          
    //       costo: 600000,
    //       tamañoM2: 7,
    //       ubicacion: "Calle 1 # 10-14",
    //       descripcion: "Apartamento comodo para pareja",
    //       serviciosBasicos: true,
    //       internet: false,
    //       alimentacion: true,
    //       tv: false,
    //       imagen: "http://images.locanto.com.co/1146921655/HERMOSOS-Y-MODERNOS-APARTAMENTOS-Y-APARTAESTUDIOS-PARA-LA-VENTA_3.jpg",
    //       interesados: 2,
    //       comentarios: [{ productor: "pedro", descripcion: "bueno", fecha: "2000" }]
    //     }]
    //   }
    //   //TENER CUIDADO EN EL MOMENTO DE CARGAR Y ASIGNAR APARTAMENTOS 
    // ];
  }
  validar(user: string, pass: string): Observable<{ success: boolean, user: Propietario }> {
    const body = { user: user, pass: pass };
    return this.http.post(URL + "/propietarios/login", body).map((response) => {
      let res = response.json();
      console.log(res.user);
      return res;
    }).catch((err) => {
      return Observable.throw(err);
    });
  }
  registrar(propietario: Propietario): Observable<{ success: boolean, message: string }> {
    let contentType = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions(contentType);
    return this.http.post(URL + "/propietarios/registrar", propietario, options).map((response) => {
      return response.json();
    }).catch((err) => {
      return Observable.throw(err);
    });
  }


}
