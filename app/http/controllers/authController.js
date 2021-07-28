const User = require("../../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

class authController {
  login(req, res) {
    res.render("auth/login");
  }

  register(req, res) {
    res.render("auth/register");
  }

  postLogin(req, res) {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        req.flash("error", info.message);
        return next(err);
      }

      if (!user) {
        req.flash("error", info.message);
        res.redirect("/login");
      }

      req.logIn(user, (err) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }

        return res.redirect("/");
      });
    })(req, res);
  }

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
  }
}

module.exports = new authController();
