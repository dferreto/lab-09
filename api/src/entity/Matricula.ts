import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "./Estudiante";
import { DetalleMatricula } from "./DetalleMatricula";

@Entity()
export class Matricula {
  @PrimaryGeneratedColumn()
  idMatricula: number;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.matriculas, {
    cascade: true,
  })
  estudiantes: Estudiante;

  @Column({ type: "date" })
  fechaMatricula: Date;

  @OneToMany(() => DetalleMatricula, (detalle) => detalle.matricula, {
    cascade: true,
  })
  detalles: DetalleMatricula[];

  @Column({ default: true })
  estado: boolean;
}
