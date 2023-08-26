

import { Router } from 'express';
import cursos from './cursos';
import estudiante from './estudiante';


const routes = Router();


routes.use("/estudiante", estudiante);
routes.use("/curso", cursos);




export default routes;
