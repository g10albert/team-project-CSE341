const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

// Build Active Passport Authorization Settings
require("./config/passport")(passport);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Establish Crypto Tracking State Session Parameters
app.use(
  session({
    secret: process.env.SESSION_SECRET || "tasksphere_secure_secret_key",
    resave: false,
    saveUninitialized: false,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(
    `Server responsive and actively processing data lines on port: ${PORT}`,
  );
});
