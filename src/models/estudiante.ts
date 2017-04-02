import {Sesion} from '../models/sesion';

export class Estudiante extends Sesion {
    noIdentificacion: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    ciudadOrigen: string;
}