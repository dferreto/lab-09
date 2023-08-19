import { Cursos } from "./curso";
import { Matriculas } from "./matricula";

export interface DetalleMatriculas {
    idDetalle: number;
    curso:Cursos;
    matricula:Matriculas;
}