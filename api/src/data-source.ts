import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Curso } from './entity/Curso';
import { DetalleMatricula } from './entity/DetalleMatricula';
import { Estudiante } from './entity/Estudiante';
import { Matricula } from './entity/Matricula';


export const AppDataSource= new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'pruebautn',
  synchronize: true,
  logging: false,
  entities: [
    Curso,
    DetalleMatricula,
    Estudiante,
    Matricula,
  
  ],
  migrations: [],
  subscribers: [],
});
