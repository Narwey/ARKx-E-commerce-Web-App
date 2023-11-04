const jwt = require('jsonwebtoken');

const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    // Get the token from the cookie
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      // Decode the token to access user data
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const userRole = decodedToken.role;

      if (requiredRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' }); // User doesn't have the required role
      }
    } catch (error) {
      res.status(401).json({ message: 'Token invalid or expired' });
    }
  };
};

module.exports = checkRole;
