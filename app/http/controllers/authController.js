const User = require("../../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

class AuthController {
  login(req, res) {
    res.render("auth/login");
  }

  register(req, res) {
    res.render("auth/register");
  }

  postLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
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
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    })
      .save()
      .then((user) => {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/");
        });
      })
      .catch((err) => {
        req.flash("error", "Something went wrong");
        return res.redirect("/register");
      });
  }

  logout(req, res) {
    req.logout();
    res.redirect("/login");
  }
}

module.exports = new AuthController();
