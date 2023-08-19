
import estudiantes from './estudiantes';
import cursos from './cursos';
import matriculas from './matriculas';
import { Router } from 'express';

const routes = Router();

routes.use('/estudiantes', estudiantes);
routes.use('/cursos', cursos);
routes.use('/matriculas', matriculas);


export default routes;
