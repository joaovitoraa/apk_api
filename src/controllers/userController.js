import bcrypt from 'bcryptjs';
import { user } from '../models/User.js';

class UsuarioController {
  static async listarUsuarios(req, res, next) {
    try {
      const listaUsuarios = await user.find({}).select('-senha'); // Não retorna a senha
      res.status(200).json(listaUsuarios);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async listarUsuarioPorId(req, res, next) {
    try {
      const id = req.params.id;
      const usuarioEntrado = await user.findById(id).select('-senha'); // Remove a senha

      if (usuarioEntrado !== null) {
        res.status(200).json(usuarioEntrado);
      } else {
        res.status(404).json({ message: 'Id do usuário não localizado' });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async cadastrarUsuario(req, res, next) {
    try {
      const { nome, email, senha } = req.body;

      // Verifica se o e-mail já está cadastrado
      const usuarioExistente = await user.findOne({ email });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'E-mail já cadastrado!' });
      }

      // Criptografa a senha
      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(senha, salt);

      // Cria o usuário com a senha já criptografada
      const novoUsuario = await user.create({
        nome,
        email,
        senha: senhaCriptografada,
      });

      res.status(201).json({
        message: 'Usuário criado com sucesso!',
        user: {
          nome: novoUsuario.nome,
          email: novoUsuario.email,
          _id: novoUsuario._id,
        }, // Não retorna a senha
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async atualizarUsuario(req, res, next) {
    try {
      const id = req.params.id;
      await user.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: 'Usuario atualiado com sucesso!' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async deletarUsuario(req, res, next) {
    try {
      const id = req.params.id;
      await user.findByIdAndDelete(id);
      res.status(200).json({ message: 'Usuario excluido com Sucesso!' });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}

export default UsuarioController;
