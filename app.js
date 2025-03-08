require("dotenv").config();
const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const session = require("express-session");
const passport = require("./config/passport");
const pool = require("./db/pool");
const pgStore = require("connect-pg-simple")(session);

const sessionStore = new pgStore({
  pool: pool,
});

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express app running at port: ${PORT}`);
});
