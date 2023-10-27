const checkRole = (requiredRole) => {
    return (req, res, next) => {
      // Get the role from the jwt token a hmida 
      const userRole = req.user.role;
  
      if (userRole === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: 'Access denied' }); // User doesn't have the required role
      }
    };
  };

module.exports = checkRole ;
