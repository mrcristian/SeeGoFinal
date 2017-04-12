import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { URL } from '../app/app.config';


@Injectable()
export class EstudianteService {
    data: Estudiante[];
    estudiante: Estudiante;

    constructor(public http: Http) {
        // this.loadData();
    }
    // loadData() {
    //     this.data = [
    //         { user: "pedro", pass: "123", tipo: "user", noIdentificacion: "101010", nombre: "pedro", apellido: "leon", direccion: "cra1", telefono: "3212443243", ciudadOrigen: "Pitalito" }
    //     ];
    // }

    registrar(estudiante: Estudiante):Observable <{success: boolean, message: string}> {
        let contentType = new Headers({ "Content-Type": "application/json" });
        let options = new RequestOptions(contentType);
        return this.http.post(URL + "/estudiantes/registrar", estudiante, options).map((response) => {
            return response.json();
        }).catch((err) => {
            return Observable.throw(err);
        });
    }

    validar(user: string, pass: string): Observable<{ success: boolean, user: Estudiante }> {
        const body = { user: user, pass: pass };
        return this.http.post(URL + "/estudiantes/login", body).map((response) => {
            let res = response.json();            
            return res;
        }).catch((err) => {
            return Observable.throw(err);
        });
    }




}