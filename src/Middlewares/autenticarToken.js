import jwt from 'jsonwebtoken';

function autenticarToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado!' });
  }

  try {
    const decoded = jwt.verify(token, 'seuSegredoSuperSecreto');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Token inválido!' });
  }
}

export default autenticarToken;
