require("dotenv").config();
const bcrypt = require("bcryptjs");
const express = require("express");
const path = require("node:path");
const db = require("./db/queries");
const indexRouter = require("./routes/indexRouter");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("./db/pool");
const pgStore = require("connect-pg-simple")(session);

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUserName(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserByUserId(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

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

app.use(passport.session())
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
