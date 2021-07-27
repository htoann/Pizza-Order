const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();

// Session config
app.use(
  session({
    secret: `"${process.env.COOKIE_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

// Assets
app.use(express.static("public"));

// Set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

// Database connection
// mongodb+srv://root:root@cluster0.aj2mc.mongodb.net/pizza
const dbURI = "mongodb://localhost/pizza";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
