import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Estudiante } from '../entity/Estudiante';
import { CursoEstudiante } from '../entity/EstudianteCursos';

class EstudianteController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const estudianteRepo = AppDataSource.getRepository(Estudiante);
      const lista = await estudianteRepo.find({
        where: { estado: true },
        relations: { cursos: true },
      });
      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontró resultados.' });
      }
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };
  
//   static getById = async (req: Request, resp: Response) => {
//     try {
//       const cedula = req.params['cedula'];
//       if (!cedula) {
//         return resp
//           .status(404)
//           .json({ mensaje: 'No se indica la cedula del estudiante' });
//       }
//       const estudianteRepo = AppDataSource.getRepository(Estudiante);
//       let estudiante;
//       try {
//         estudiante = await estudianteRepo.findOneOrFail({
//           where: { cedula: cedula },
//           relations: { cursos: true },
//         });
//       } catch (error) {
//         return resp
//           .status(404)
//           .json({ mensaje: 'No se encontro el estudiante con esa cedula' });
//       }
//       return resp.status(200).json(estudiante);
//     } catch (error) {
//       return resp.status(400).json({ mensaje: error });
//     }
//   };

//   static add = async (req: Request, resp: Response) => {
//     try {
 
//       const { cedula, nombre, apellido1, apellido2, fechaNac, cursos } =
//         req.body;

  
//       if (!cedula) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe indicar la cedula del estudiante' });
//       }
//       if (!nombre) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe indicar una nombre del estudiante' });
//       }
//       if (!apellido1) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe indicar el primer apellido del estudiante' });
//       }
//       if (!apellido2) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe indicar el primer segundo del estudiante' });
//       }
//       if (!fechaNac) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe indicar la fecha de nacimiento del estudiante' });
//       }
//       if (!cursos || cursos.length == 0) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe asignar licencias al chofer' });
//       }

//       const today = new Date();
//       const cumple = new Date(fechaNac);
//       let age = today.getFullYear() - cumple.getFullYear();
//       const monthDiff = today.getMonth() - cumple.getMonth();
//       if (
//         monthDiff < 0 ||
//         (monthDiff === 0 && today.getDate() < cumple.getDate())
//       ) {
//         age--;
//       }
//       if (age < 18) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'Debe ser mayor de edad' });
//       }
      

      
//       // validacion de reglas de negocio
//       const estudianteRepo = AppDataSource.getRepository(Estudiante);
//       const estudiante = await estudianteRepo.findOne({ where: { cedula: cedula } });
//       if (estudiante) {
//         return resp
//           .status(400)
//           .json({ mensaje: 'El estudiante ya existe en la base de datos' });
//       }

//       //validacion de licencias repetidas

//       const listaCursos = cursos.map((cur) => {
//         const curEstu = new CursoEstudiante();
//         curEstu.estudiante = cedula;
//         curEstu.curso = cur.id;
//         return curEstu;
//       });

//       let estudianteNew = new Estudiante();
//       estudianteNew.cedula = cedula;
//       estudianteNew.nombre = nombre;
//       estudianteNew.apellido1 = apellido1;
//       estudianteNew.apellido2 = apellido2;
//       estudianteNew.fechaNac = fechaNac;
//       estudianteNew.cursos = listaCursos;
//       estudianteNew.estado = true;
//       try {
//         await estudianteRepo.save(estudianteNew);
//         return resp.status(201).json({ mensaje: 'Estudiante creado' });
//       } catch (error) {
//         return resp.status(400).json({ mensaje: 'Error al guardar.' });
//       }
//     } catch (error) {
//       return resp.status(400).json({ mensaje: error });
//     }
//   };

 }
  
export default EstudianteController;