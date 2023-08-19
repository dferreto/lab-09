import { DetalleMatriculas } from "./detalleMatricula";
import { Estudiantes } from "./estudiante";

export interface Matriculas {
    idMatricula: number;
    estudiante: Estudiantes;
    fechaMatricula: Date;
    detalleMatricula: DetalleMatriculas;
}