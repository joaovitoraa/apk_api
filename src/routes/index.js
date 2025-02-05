import express from 'express';
import usuarios from '../routes/usuarioRouter.js';
import poster from '../routes/blogRouter.js';

const routes = (app) => {
  app.route('/').get((req, res) => res.status(200).send('APK'));

  app.use(express.json(), usuarios, poster);
};

export default routes;
