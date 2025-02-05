import express from 'express';
import BlogController from '../controllers/blogController.js';

const routes = express.Router();

routes.get('/poster', BlogController.pesquisarblog);
routes.get('/poster/:id', BlogController.pesquisarblogPorId);
routes.post('/poster', BlogController.cadastrarPoste);
routes.put('/poster/:id', BlogController.atualizarPoste);

export default routes;
