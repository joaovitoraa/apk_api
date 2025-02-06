import blog from '../models/Blog.js';

class BlogController {
  static async pesquisarblog(req, res, next) {
    try {
      const pesquisaBlog = await blog.find({});
      res.status(200).json(pesquisaBlog);
    } catch (error) {
      next(error);
    }
  }

  static async pesquisarblogPorId(req, res, next) {
    try {
      const id = req.params.id;
      const posteEncontrado = await blog.findById(id);
      if (!posteEncontrado) {
        return res.status(404).json({ message: 'Poste não encontrado' });
      }
      res.status(200).json(posteEncontrado);
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarPoste(req, res, next) {
    console.log('Recebendo requisição de cadastro...');
    console.log('Dados recebidos:', req.body);

    try {
      const { titulo, descricao, image } = req.body;

      // Validação básica para evitar salvar posts sem dados
      if (!titulo || !descricao) {
        return res
          .status(400)
          .json({ message: 'Título e descrição são obrigatórios!' });
      }

      const posteCriado = await blog.create({ titulo, descricao, image });
      console.log('Poste criado:', posteCriado);

      res
        .status(201)
        .json({ message: 'Criado com sucesso', blog: posteCriado });
    } catch (error) {
      console.error('Erro ao criar o post:', error);
      next(error);
    }
  }

  static async atualizarPoste(req, res, next) {
    try {
      const id = req.params.id;
      const atualizado = await blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!atualizado) {
        return res.status(404).json({ message: 'Poste não encontrado' });
      }

      res.status(200).json({ message: 'Poste atualizado', blog: atualizado });
    } catch (error) {
      next(error);
    }
  }
  static async deletarPoster(req, res, next) {
    try {
      const id = req.params.id;
      await blog.findByIdAndDelete(id);
      res.status(200).json({ message: 'Poster excluido' });
    } catch (erro) {
      next(erro);
    }
  }
}

export default BlogController;
