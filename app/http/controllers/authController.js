const User = require("../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
const someOtherPlaintextPassword = "not_bacon";

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;

      // Check if email exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      // Hashpassword
      const hasedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const user = new User({
        name,
        email,
        password: hasedPassword,
      })
        .save()
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },
  };
}

module.exports = authController;
