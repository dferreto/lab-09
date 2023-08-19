import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Matricula } from "../entity/Matricula";
import { DetalleMatricula } from "../entity/DetalleMatricula";
import { Estudiante } from "../entity/Estudiante";
import { Curso } from "../entity/Curso";


class MatriculasController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      // Obtener el repositorio de matrículas
      const repoMatriculas = AppDataSource.getRepository(Matricula);

      let lista;
      try {
        // Buscar todas las matrículas con estado activo y cargar relaciones de detalles
        lista = await repoMatriculas.find({
          where: { estado: true },
          relations: { detalles: true },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontraron datos." });
      }

      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: "No se encontraron datos." });
      }

      // Devolver la lista de matrículas con detalles
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error al cargar datos." });
    }
  };

  static getById = async (req: Request, resp: Response) => {
    try {
      // Obtener el ID de la matrícula de los parámetros de la solicitud
      const idMatricula = parseInt(req.params['id']); // Asegúrate de usar el nombre correcto del parámetro
  
      // Si no se proporciona un ID válido, devolver una respuesta de error
      if (!idMatricula) {
        return resp.status(404).json({ mensaje: 'No se indica el ID de la matrícula.' });
      }
  
      // Obtener el repositorio de matrículas
      const repoMatriculas = AppDataSource.getRepository(Matricula);
  
      let matricula;
      try {
        // Buscar la matrícula por su ID y cargar relaciones de detalles
        matricula = await repoMatriculas.findOneOrFail({
          where: { idMatricula, estado: true },
          relations: { detalles: true },
        });
      } catch (error) {
        // Si no se encuentra la matrícula, devolver una respuesta de error
        return resp
          .status(404)
          .json({ mensaje: 'No se encontro la matrícula con ese ID.' });
      }
  
      // Crear una respuesta con la estructura deseada
      const response = {
        idMatricula: matricula.idMatricula,
        fechaMatricula: matricula.fechaMatricula,
        estado: matricula.estado,
        detalles: matricula.detalles.map(detalle => ({ idDetalle: detalle.idDetalle })),
      };
  
      // Devolver la respuesta
      return resp.status(200).json(response);
    } catch (error) {
      // Devolver una respuesta de error en caso de excepción
      return resp.status(400).json({ mensaje: error });
    }
  };
  
  
  

  static add = async (req: Request, resp: Response) => {
    try {
      // Obtener la cédula y detalles de la solicitud
      const { cedula, detalles } = req.body;
  
      // Obtener el repositorio de estudiantes
      const estudianteRepo = AppDataSource.getRepository(Estudiante);
  
      // Buscar al estudiante por su cédula
      const estudiante = await estudianteRepo.findOne({
        where: { cedula: cedula },
      });
  
      // Si no se encuentra el estudiante, devolver una respuesta de error
      if (!estudiante) {
        return resp.status(404).json({ mensaje: "Estudiante no encontrado" });
      }
  
      // Crear una nueva instancia de Matricula
      const matricula = new Matricula();
      matricula.estudiantes = estudiante;
      matricula.fechaMatricula = new Date(); // Asigna la fecha actual
      matricula.estado = true;
  
      const detalleMatriculas = [];
      const cursoRepo = AppDataSource.getRepository(Curso);
  
      // Iterar sobre los detalles proporcionados
      for (const detalleInfo of detalles) {
        // Buscar el curso por su ID
        const curso = await cursoRepo.findOne({
          where: { idCurso: detalleInfo.curso },
        });
  
        // Si no se encuentra el curso, devolver una respuesta de error
        if (!curso) {
          return resp.status(404).json({
            mensaje: `Curso con ID '${detalleInfo.curso}' no encontrado`,
          });
        }
  
        // Crear una nueva instancia de DetalleMatricula
        const detalleMatricula = new DetalleMatricula();
        detalleMatricula.cursos = curso;
        detalleMatricula.matricula = matricula;
        detalleMatriculas.push(detalleMatricula);
      }
  
      // Asignar los detalles a la matrícula
      matricula.detalles = detalleMatriculas;
  
      // Obtener los repositorios de matrícula y detalles de matrícula
      const matriRepo = AppDataSource.getRepository(Matricula);
      const detalleRepo = AppDataSource.getRepository(DetalleMatricula);
  
      // Guardar la matrícula y los detalles de matrícula en la base de datos
      await matriRepo.save(matricula);
      await detalleRepo.save(detalleMatriculas);
  
      // Devolver una respuesta exitosa
      return resp.status(201).json({ mensaje: "Matricula creada" });
    } catch (error) {
      // Devolver una respuesta de error en caso de excepción
      return resp.status(400).json({ mensaje: error.message });
    }
  };
  

  static update = async (req: Request, resp: Response) => {};

  static delete = async (req: Request, resp: Response) => {};
}

export default MatriculasController;
