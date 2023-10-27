function checkRoles(roles) {
    return (req, res, next) => {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(403).json({ error: 'Forbidden' });
      }
    };
  }
  
  module.exports = checkRoles;
  