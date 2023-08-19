import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { DetalleMatricula } from "./DetalleMatricula";

@Entity()
export class Curso {
  @PrimaryColumn()
  @IsNotEmpty({ message: "Debe indicar el ID" })
  idCurso: number;

  @Column({ length: 50 })
  @IsNotEmpty({ message: "Debe indicar el nombre del curso" })
  nombreCurso: String;

  @Column()
  estado: boolean;

  @OneToMany(() => DetalleMatricula, (detalle) => detalle.cursos)
  detallesMatricula: DetalleMatricula[];
}
