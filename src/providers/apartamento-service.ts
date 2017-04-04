import { Injectable } from '@angular/core';
import { Apartamento } from '../models/apartamento';
import { Observable } from "rxjs/Observable";
import { Http, RequestOptions, Headers } from '@angular/http';
import {URL} from '../app/app.config';

@Injectable()
export class ApartamentoService {    

    constructor(public http:Http) {
    }

    getDisponibles(): Observable<{data:any}> {
        let body = {};
        return this.http.post(URL + "/apartamentos/consultarDisponibles",body).map(response => {
            return {data: response.json()};
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
