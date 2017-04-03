import { Injectable } from '@angular/core';
import { Apartamento } from '../models/apartamento';

@Injectable()
export class ApartamentoService {
    data: Apartamento[]

    constructor() {
        this.loadData();
    }
    loadData() {
    //     this.data = [
    //         {
    //             idPropietario: "100",
    //             telefono: "3213214325",
    //             correo: "p1@gmail.com",                
    //             costo: 600000,
    //             tamañoM2: 7,
    //             ubicacion: "Calle 1 # 10-14",
    //             descripcion: "Apartamento comodo para pareja",
    //             serviciosBasicos: true,
    //             internet: false,
    //             alimentacion: true,
    //             tv: false,
    //             imagen: "http://images.locanto.com.co/1146921655/HERMOSOS-Y-MODERNOS-APARTAMENTOS-Y-APARTAESTUDIOS-PARA-LA-VENTA_3.jpg",
    //             interesados: 2,
    //             comentarios: []
    //         },
    //         {
    //             idPropietario: "101",
    //             telefono: "3453456789",
    //             correo: "p2@gmail.com",                
    //             costo: 500000,
    //             tamañoM2: 6,
    //             ubicacion: "Calle 2 # 22-14",
    //             descripcion: "Apartamento con buena vista",
    //             serviciosBasicos: true,
    //             internet: true,
    //             alimentacion: false,
    //             tv: false,
    //             imagen: "https://imganuncios.mitula.net/apartamento_cerca_del_nuevo_centro_comercial_apartamento_cerca_del_7380123453412070626.jpg",
    //             interesados: 4,
    //             comentarios: []
    //         },
    //         {
    //             idPropietario: "101",
    //             telefono: "3453456789",
    //             correo: "p2@gmail.com",                
    //             costo: 550000,
    //             tamañoM2: 8,
    //             ubicacion: "Calle 3 # 2-14",
    //             descripcion: "Apartamento grande ideal para una familia",
    //             serviciosBasicos: true,
    //             internet: false,
    //             alimentacion: true,
    //             tv: true,
    //             imagen: "https://http2.mlstatic.com/D_NQ_NP_227425-MCO25450902626_032017-K.jpg",
    //             interesados: 6,
    //             comentarios: []
    //         }
    //     ];
    }

    getApartamentos() {        
    }

}
