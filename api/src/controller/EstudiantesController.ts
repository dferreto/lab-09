import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Estudiante } from "../entity/Estudiante";

class EstudiantesController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const estudiantesRepo = AppDataSource.getRepository(Estudiante);

      // Obtener la lista de estudiantes activos
      const listaEstudiantes = await estudiantesRepo.find({
        where: { estado: true },
      });

      if (listaEstudiantes.length == 0) {
        // Devolver un mensaje 404 si no se encuentran estudiantes
        return resp.status(404).json({ mensaje: "No se encontró resultados." });
      }

      // Devolver la lista de estudiantes en una respuesta JSON exitosa
      return resp.status(200).json(listaEstudiantes);
    } catch (error) {
      // Capturar y devolver un mensaje 400 si ocurre un error
      return resp.status(400).json({ mensaje: error });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      const cedula = req.params["cedula"];

      if (!cedula) {
        // Devolver un mensaje 404 si no se proporciona la cédula
        return resp.status(404).json({ mensaje: "No se indica la cédula." });
      }

      const estudiantesRepo = AppDataSource.getRepository(Estudiante);

      let estudiante;
      try {
        // Buscar al estudiante por cédula y estado activo
        estudiante = await estudiantesRepo.findOneOrFail({
          where: { cedula, estado: true },
        });
      } catch (error) {
        // Devolver un mensaje 404 si no se encuentra el estudiante
        return resp
          .status(404)
          .json({ mensaje: "No se encontro el estudiante con esa cédula." });
      }

      // Devolver el estudiante encontrado en una respuesta JSON exitosa
      return resp.status(200).json(estudiante);
    } catch (error) {
      // Capturar y devolver un mensaje 400 si ocurre un error
      return resp.status(400).json({ mensaje: error });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { cedula, nombre, apellido1, apellido2, fechaNac } = req.body;

      const estudiantesRepo = AppDataSource.getRepository(Estudiante);

      // Buscar si ya existe un estudiante con la misma cédula
      const est = await estudiantesRepo.findOne({ where: { cedula } });

      if (est) {
        // Devolver un mensaje 404 si el estudiante ya existe
        return resp
          .status(404)
          .json({ mensaje: "El estudiante ya existe en la base datos." });
      }

      // Crear un nuevo estudiante con los datos proporcionados
      let estudiante = new Estudiante();
      estudiante.cedula = cedula;
      estudiante.nombre = nombre;
      estudiante.apellido1 = apellido1;
      estudiante.apellido2 = apellido2;
      estudiante.fechaNac = fechaNac;
      estudiante.estado = true;

      // Validar el estudiante utilizando class-validator
      const errors = await validate(estudiante, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        // Devolver un mensaje 400 si hay errores de validación
        return resp.status(400).json(errors);
      }

      // Guardar el estudiante en la base de datos
      await estudiantesRepo.save(estudiante);

      // Devolver un mensaje 201 si se crea el estudiante exitosamente
      return resp.status(201).json({ mensaje: "Estudiante creado." });
    } catch (error) {
      // Capturar y devolver un mensaje 400 si ocurre un error
      return resp.status(400).json({ mensaje: error });
    }
  };

  static update = async (req: Request, resp: Response) => {
    try {
      const { cedula, nombre, apellido1, apellido2, fechaNac } = req.body;

      const estudiantesRepo = AppDataSource.getRepository(Estudiante);

      let est: Estudiante;

      try {
        // Buscar al estudiante por cédula
        est = await estudiantesRepo.findOneOrFail({ where: { cedula } });
      } catch (error) {
        // Devolver un mensaje 404 si no se encuentra el estudiante
        return resp.status(404).json({ mensaje: "No existe el estudiante." });
      }

      // Actualizar los datos del estudiante con los proporcionados
      est.cedula = cedula;
      est.nombre = nombre;
      est.apellido1 = apellido1;
      est.apellido2 = apellido2;
      est.fechaNac = fechaNac;
      est.estado = true;

      // Validar el estudiante actualizado utilizando class-validator
      const errors = await validate(est, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        // Devolver un mensaje 400 si hay errores de validación
        return resp.status(400).json(errors);
      }

      // Guardar los cambios en el estudiante en la base de datos
      await estudiantesRepo.save(est);

      // Devolver un mensaje 200 si se actualiza el estudiante exitosamente
      return resp.status(200).json({ mensaje: "Se guardo correctamente." });
    } catch (error) {
      // Capturar y devolver un mensaje 400 si ocurre un error
      return resp.status(400).json({ mensaje: "No pudo guardar." });
    }
  };

  static delete = async (req: Request, resp: Response) => {
    try {
      const cedula = req.params["cedula"];
      if (!cedula) {
        // Devolver un mensaje 404 si no se proporciona la cédula
        return resp.status(404).json({ mensaje: "Debe indicar la cédula." });
      }

      const estudiantesRepo = AppDataSource.getRepository(Estudiante);
      let est: Estudiante;

      try {
        // Buscar al estudiante por cédula y estado activo
        est = await estudiantesRepo.findOneOrFail({
          where: { cedula: cedula, estado: true },
        });
      } catch (error) {
        // Devolver un mensaje 404 si no se encuentra el estudiante
        return resp
          .status(404)
          .json({ mensaje: "No se encuentra el estudiante con esa cédula." });
      }

      // Cambiar el estado del estudiante a inactivo
      est.estado = false;

      try {
        // Guardar los cambios en el estudiante en la base de datos
        await estudiantesRepo.save(est);

        // Devolver un mensaje 200 si se elimina el estudiante exitosamente
        return resp.status(200).json({ mensaje: "Se eliminó correctamente." });
      } catch (error) {
        // Capturar y devolver un mensaje 400 si ocurre un error al eliminar
        return resp.status(400).json({ mensaje: "No se pudo eliminar." });
      }
    } catch (error) {
      // Capturar y devolver un mensaje 400 si ocurre un error
      return resp.status(400).json({ mensaje: "No se pudo eliminar." });
    }
  };

}

export default EstudiantesController;
