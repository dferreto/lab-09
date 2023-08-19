import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { Matricula } from "./Matricula";

@Entity()
export class Estudiante {
  @PrimaryColumn({ length: 9 })
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

  @OneToMany(() => Matricula, (matricula) => matricula.estudiantes)
  matriculas: Matricula[];

  @Column({ default: true })
  estado: boolean;
}
