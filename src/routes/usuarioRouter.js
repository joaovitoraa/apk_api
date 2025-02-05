import express from 'express';
import UsuarioController from '../controllers/userController.js';
import { user } from '../models/User.js';

const routes = express.Router();

routes.get('/usuarios', UsuarioController.listarUsuarios, async (req, res) => {
  try {
    const usuarios = await user.find().select('-senha');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error });
  }
});
routes.get('/usuarios/:id', UsuarioController.listarUsuarioPorId);
routes.post('/usuarios', UsuarioController.cadastrarUsuario);
routes.put('/usuarios/:id', UsuarioController.atualizarUsuario);
routes.delete('/usuarios/:id', UsuarioController.deletarUsuario);

export default routes;
