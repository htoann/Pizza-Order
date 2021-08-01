const homeRouter = require("./homeRouter");
const authRouter = require("./authRouter");
const cartRouter = require("./cartRouter");
const customerRouter = require("./customerRouter");
const adminRouter = require("./customerRouter");

module.exports = function initRoute(app) {
  app.use("/auth", authRouter);

  app.use("/customer", customerRouter);

  app.use("/admin", adminRouter);

  app.use("/", cartRouter);

  app.use("/", homeRouter);

  app.get((req, res) => {
    return res.status(404).render("404");
  });
};
