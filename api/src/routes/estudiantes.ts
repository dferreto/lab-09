
import { Router } from "express";
import EstudiantesController from "../controller/EstudiantesController";


const routes = Router();


routes.get("", EstudiantesController.getAll);
routes.get("/:cedula", EstudiantesController.getById);
routes.post("", EstudiantesController.add);
routes.patch("", EstudiantesController.update);
routes.delete("/:cedula", EstudiantesController.delete);
export default routes;
