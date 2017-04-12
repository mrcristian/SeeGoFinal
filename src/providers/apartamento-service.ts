import { Injectable } from '@angular/core';
import { Apartamento } from '../models/apartamento';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from '@angular/http';
import { URL } from '../app/app.config';

@Injectable()
export class ApartamentoService {

    constructor(public http: Http) {
    }

    getDisponibles(): Observable<{ data: any }> {
        let body = {};
        return this.http.post(URL + "/apartamentos/consultarDisponibles", body).map(response => {
            return { data: response.json() };
        }).catch(err => {
            return Observable.throw(err);
        });
    }
    getMisInmuebles(id: string) {
        let body = { idPropietario: id };
        return this.http.post(URL + "/apartamentos/consultarMisInmuebles", body).map(response => {
            return { data: response.json() };
        }).catch(err => {
            return Observable.throw(err);
        });
    }
    agregarInmueble(apartamento: Apartamento): Observable<{ success: boolean, message: string, idRegistrado: string }> {
        let contentType = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions(contentType);
        return this.http.post(URL + "/apartamentos/registrar", apartamento, options).map(response => {
            return response.json();
        }).catch(err => {
            return Observable.throw(err);
        });
    }
    actualizarInmueble(id: string, inmueble: any): Observable<{ success: boolean, message: string }> {
        let contentType = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions(contentType);
        return this.http.put(URL + "/apartamentos/" + id, inmueble, options).map((response) => {
            return response.json();
        }).catch(err => {
            return Observable.throw(err);
        });
    }
    //   all(): Observable<Libro[]> {
    //     return this.http.get(URL + "/books").map(response => {
    //       return response.json();
    //     }).catch(err => {
    //       return Observable.throw(err);
    //     });
    //   }
}
