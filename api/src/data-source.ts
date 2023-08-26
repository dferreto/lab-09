import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Curso } from './entity/Cursos';
import { Estudiante } from './entity/Estudiante';
import { CursoEstudiante } from './entity/EstudianteCursos';



export const AppDataSource= new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'lab09',
  synchronize: true,
  logging: false,
  entities: [ 
    Curso,
    Estudiante,
    CursoEstudiante,
  ],
  migrations: [],
  subscribers: [],
});
