import { Router } from "express";
import MatriculasController from "../controller/MatriculasController";


const routes = Router();


routes.get("", MatriculasController.getAll);
routes.get("/:id", MatriculasController.getById);
routes.post("", MatriculasController.add);

export default routes;
