import { Comentario } from "./comentario";

export class Apartamento {
    //Propietario
    idPropietario: string;
    telefono: string;
    correo: string;
    //Detalles        
    _id:string;
    costo: number;
    size: number;
    ubicacion: string;
    descripcion: string;
    serviciosBasicos: string;
    internet: string;
    alimentacion: string;
    tv: string;
    visible:string;
    imagen: string;
    //Comentarios e interesados
    interesados:number;
    comentarios:Comentario[]
}