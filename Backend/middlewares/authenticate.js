const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'yourSecretKey');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = authenticate;
