module.exports = function guest(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/");
};
