
import { Cursos } from "./curso";
import { Estudiante } from "./estudiante";


export interface CursoEstudiante {
    id: string;
    estudiante: Estudiante;
    curso: Cursos; 
}