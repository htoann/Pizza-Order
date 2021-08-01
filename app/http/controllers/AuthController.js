const User = require("../../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const passport = require("passport");

const _getRedirectUrl = (req) => {
  return req.body.email === "admin@admin.com"
    ? "/admin/orders"
    : "/customer/orders";
};

class AuthController {
  login(req, res) {
    res.render("auth/login");
  }

  register(req, res) {
    res.render("auth/register");
  }

  postLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: _getRedirectUrl(req),
      failureRedirect: "/auth/login",
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
        return res.redirect("/auth/register");
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
        return res.redirect("/auth/register");
      });
  }

  logout(req, res) {
    req.logout();
    res.redirect("/auth/login");
  }
}

module.exports = new AuthController();
