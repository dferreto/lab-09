import { Router } from "express";
import CursosController from "../controller/CursosController";


const routes = Router();

routes.get("", CursosController.getAll);


export default routes;
