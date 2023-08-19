import { Router } from "express";
import CursosController from "../controller/CursosController";


const routes = Router();

routes.get("", CursosController.getAll);
routes.get("/:id", CursosController.getById);
routes.post("", CursosController.add);
routes.patch("", CursosController.update);
routes.delete("/:id", CursosController.delete);

export default routes;
