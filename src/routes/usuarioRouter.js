import express from 'express';
import UsuarioController from '../controllers/userController.js';
import autenticarToken from '../Middlewares/autenticarToken.js';
import { user } from '../models/User.js';

const routes = express.Router();

routes.get('/usuarios', UsuarioController.listarUsuarios);
async (req, res) => {
  try {
    const usuarios = await user.find().select('-senha');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
};
routes.get(
  '/usuarios/:id',
  autenticarToken,
  UsuarioController.listarUsuarioPorId,
);
routes.post('/usuarios', UsuarioController.cadastrarUsuario);
routes.put(
  '/usuarios/:id',
  autenticarToken,
  UsuarioController.atualizarUsuario,
);
routes.delete(
  '/usuarios/:id',
  autenticarToken,
  UsuarioController.deletarUsuario,
);

routes.post('/usuarios/login', UsuarioController.loginUsuario);

export default routes;
