import { CursoEstudiante } from "./cursoEstudiante";

export interface Estudiante {
    cedula: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    fechaNac: Date;
    estado: boolean;
    cursos: CursoEstudiante[];
}