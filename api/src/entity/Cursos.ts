import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsNotEmpty } from "class-validator";
import { CursoEstudiante } from "./EstudianteCursos";



@Entity()
export class Curso {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 50 })
  @IsNotEmpty({ message: "Debe indicar el nombre del curso" })
  nombre: String;

  @Column({default: true})
  estado: boolean;

  @OneToMany(() => CursoEstudiante, (curEstudiante) => curEstudiante.curso)
  estudiantes: CursoEstudiante[];
}
