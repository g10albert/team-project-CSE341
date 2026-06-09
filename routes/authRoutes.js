const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/api-docs' }),
  (req, res) => {
    res.redirect('/api-docs'); 
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: 'Session killed: Logged out successfully.' });
  });
});

module.exports = router;