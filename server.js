require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const dbURI = process.env.dbURI;

// Database connection
mongoose
  .connect(`${process.env.dbURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((err) => console.log(err));

// Session store
const mongoStore = new MongoStore({
  mongoUrl: mongoose.connection._connectionString,
});

// Session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hour
  })
);

app.use(flash());

// Assets
app.use(express.static("public"));

// Set Template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`);
});
