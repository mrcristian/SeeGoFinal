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
  actualizarPropietario(id:string,propietario:any):Observable<{success:boolean, message:string}>{    
    let contentType = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions(contentType);    
    return this.http.put(URL+"/propietarios/"+id,propietario,options).map((response)=>{
      return response.json();
    }).catch(err=>{
      return Observable.throw(err);
    });
  }



}
