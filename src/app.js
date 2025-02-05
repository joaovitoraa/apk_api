import express from 'express';
import conectaNaDatabase from './config/dbConnect.js';
import routes from './routes/index.js';

// import manipuladorDeErros from './middlewares/manipuladorDeErros.js';

const conexao = await conectaNaDatabase();

conexao.on('error', (erro) => {
  console.error('erro de conexão', erro);
});

conexao.once('open', () => {
  console.log('Conexão com o Banco feita com sucesso!');
});
const app = express();
app.use(express.json());
routes(app);

// app.use(manipuladorDeErros);
export default app;

// mongodb+srv://admin:<db_password>@cluster0.hb3ra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
