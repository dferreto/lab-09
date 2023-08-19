import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Matricula } from "./Matricula";
import { Curso } from "./Curso";

@Entity()
export class DetalleMatricula {
  @PrimaryGeneratedColumn()
  idDetalle: number;

  @ManyToOne(() => Curso, (curso) => curso.detallesMatricula)
  @JoinColumn({ name: "idCurso" })
  cursos: Curso;

  @ManyToOne(() => Matricula, (matricula) => matricula.detalles)
  @JoinColumn({ name: "idMatricula" })
  matricula: Matricula;
}
