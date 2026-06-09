module.exports = {
  ensureAuth: function (req, res, next) {
    if (process.env.NODE_ENV === 'test') {
      req.user = { _id: '60c72b2f9b1d8b2bad765432', displayName: 'Test User' };
      return next();
    }
    
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ error: 'Unauthorized access: Please authenticate via /auth/google' });
  }
};