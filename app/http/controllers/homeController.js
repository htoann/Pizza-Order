function homeController() {
  return {
    index() {
      res.render("home");
    },
  };
}

module.exports = homeController;
