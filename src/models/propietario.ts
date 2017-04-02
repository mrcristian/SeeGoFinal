import { Sesion } from '../models/sesion';
import { Apartamento } from '../models/apartamento';

export class Propietario extends Sesion {
    noIdentificacion: string;
    nombre: string;
    telefono: string;
    direccion: string;
    correo: string;
    apartamentos: Apartamento[];
    
    constructor() { super(); };
}