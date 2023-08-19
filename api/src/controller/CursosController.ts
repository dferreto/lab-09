import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';
import { Curso } from '../entity/Curso';

class CursosController {
  // Obtener todos los cursos
  static getAll = async (req: Request, resp: Response) => {
    try {
      const cursosRepo = AppDataSource.getRepository(Curso);

      // Buscar todos los cursos con el estado activo
      const listaCursos = await cursosRepo.find({
        where: { estado: true },
      });

      if (listaCursos.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontró resultados.' });
      }
      return resp.status(200).json(listaCursos);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Obtener curso por ID
  static getById = async (req: Request, resp: Response) => {
    try {
      // Obtener el ID del curso de los parámetros de la solicitud
      const idCurso = parseInt(req.params['id']);

      if (!idCurso) {
        return resp.status(404).json({ mensaje: 'No se indica el ID.' });
      }

      const cursosRepo = AppDataSource.getRepository(Curso);

      let curso;
      try {
        // Buscar el curso por su ID y estado activo
        curso = await cursosRepo.findOneOrFail({
          where: { idCurso, estado: true }
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encontro el curso con ese ID.' });
      }

      return resp.status(200).json(curso);
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Agregar un nuevo curso
  static add = async (req: Request, resp: Response) => {
    try {
      // Obtener datos del curso del cuerpo de la solicitud
      const { idCurso, nombreCurso } = req.body;

      const cursosRepo = AppDataSource.getRepository(Curso);

      // Buscar si ya existe un curso con el mismo ID
      const cur = await cursosRepo.findOne({ where: { idCurso } });

      if (cur) {
        return resp
          .status(404)
          .json({ mensaje: 'El curso ya existe en la base de datos.' });
      }

      // Crear una nueva instancia de Curso
      let curso = new Curso();
      curso.idCurso = idCurso;
      curso.nombreCurso = nombreCurso;
      curso.estado = true;

      // Validar con class validator
      const errors = await validate(curso, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      // Guardar el nuevo curso en la base de datos
      await cursosRepo.save(curso);
      return resp.status(201).json({ mensaje: 'Curso creado.' });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  // Actualizar curso por ID
  static update = async (req: Request, resp: Response) => {
    try {
      // Obtener datos actualizados del curso del cuerpo de la solicitud
      const { idCurso, nombreCurso } = req.body;

      // Validación de reglas de negocio
      const cursosRepo = AppDataSource.getRepository(Curso);
   
      let cur: Curso;
    
      try {
        // Buscar el curso por su ID
        cur = await cursosRepo.findOneOrFail({ where: { idCurso } });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No existe el curso.' });
      }

      // Actualizar el nombre del curso
      cur.nombreCurso = nombreCurso;
    
      // Validar con class validator
      const errors = await validate(cur, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      try {
        // Guardar los cambios en la base de datos
        await cursosRepo.save(cur);
        return resp.status(200).json({ mensaje: 'Se guardo correctamente.' });
      } catch (error) {
        return resp.status(400).json({ mensaje: 'No pudo guardar.' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: 'No pudo guardar.' });
    }
  };

  // Eliminar curso por ID
  static delete = async (req: Request, resp: Response) => {
    try {
      // Obtener el ID del curso de los parámetros de la solicitud
      const idCurso = parseInt(req.params['id']);
      if (!idCurso) {
        return resp.status(404).json({ mensaje: 'Debe indicar el ID.' });
      }

      const cursosRepo = AppDataSource.getRepository(Curso);
      let cur: Curso;
      try {
        // Buscar el curso por su ID y estado activo
        cur = await cursosRepo.findOneOrFail({
          where: { idCurso: idCurso, estado: true },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: 'No se encuentra el curso con ese ID.' });
      }

      // Cambiar el estado del curso a inactivo
      cur.estado = false;
      try {
        // Guardar los cambios en la base de datos
        await cursosRepo.save(cur);
        return resp.status(200).json({ mensaje: 'Se eliminó correctamente.' });
      } catch (error) {
        return resp.status(400).json({ mensaje: 'No se pudo eliminar.' });
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: 'No se pudo eliminar.' });
    }
  };
}

export default CursosController;
