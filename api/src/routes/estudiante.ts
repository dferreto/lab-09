
import { Router } from "express";
import EstudiantesController from "../controller/EstudianteController";


const routes = Router();


routes.get("", EstudiantesController.getAll);


export default routes;
