import { Apartamento } from '../models/apartamento';

export class Propietario {
    _id:string;
    user: string;
    pass: string;
    tipo: string
    noIdentificacion: string;
    nombre: string;
    telefono: string;
    direccion: string;
    correo: string;
    apartamentos: Apartamento[];
}