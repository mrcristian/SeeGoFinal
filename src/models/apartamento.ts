import { Comentario } from "./comentario";

export class Apartamento {
    //Propietario
    idPropietario: string;
    telefono: string;
    correo: string;
    //Detalles        
    _id:string;
    costo: number;
    tamañoM2: number;
    ubicacion: string;
    descripcion: string;
    serviciosBasicos: boolean;
    internet: boolean;
    alimentacion: boolean;
    tv: boolean;
    imagen: string;
    //Comentarios e interesados
    interesados:number;
    comentarios:Comentario[]
}