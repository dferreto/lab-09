import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { CursoEstudiante } from "./EstudianteCursos";


@Entity()
export class Estudiante {
  @PrimaryColumn({ length: 12 })
  @IsNotEmpty({ message: "Debe indicar la cédula" })
  cedula: string;

  @Column({ length: 50 })
  @IsNotEmpty({ message: "Debe indicar el nombre" })
  nombre: String;

  @Column({ length: 50 })
  @IsNotEmpty({ message: "Debe indicar el primer apellido" })
  apellido1: string;

  @Column({ length: 50 })
  @IsNotEmpty({ message: "Debe indicar el segundo apellido" })
  apellido2: string;

  @Column({ type: "date" })
  @IsNotEmpty({ message: "Debe indicar la fecha de nacimiento" })
  fechaNac: Date;

  @Column({ default: true })
  estado: boolean;

  @OneToMany(() => CursoEstudiante, (curEstu) => curEstu.estudiante)
  cursos: CursoEstudiante[];

  
}
