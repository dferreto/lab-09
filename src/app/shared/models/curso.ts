import { CursoEstudiante } from "./cursoEstudiante";

export interface Cursos {
    idCurso: number;
    nombreCurso: string;
    estado: boolean;
    estudiantes: CursoEstudiante[];
}