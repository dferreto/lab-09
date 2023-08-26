    import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
    import { Estudiante } from "./Estudiante";
    import { Curso } from "./Cursos";


    @Entity()
    export class CursoEstudiante {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Estudiante, (estudiante) => estudiante.cursos)
    estudiante: Estudiante;

    @ManyToOne(() => Curso, (cur) => cur.estudiantes)
    curso: Curso;

    }
