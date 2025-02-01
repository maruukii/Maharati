const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();

const corsOptions = {
  origin: `${process.env.CLIENT_URL}`,
  credentials: true,
};
app.options("*", cors(corsOptions));

app.use(cors(corsOptions));
app.use(
  cookieSession({
    name: "session",
    keys: ["Maharati"],
    maxAge: 24 * 6 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.json());
//DB Connection
process.env.NODE_ENV === "production"
  ? mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("MongoDB Atlas connected"))
      .catch((error) => console.error("MongoDB connection error:", error))
  : mongoose
      .connect("mongodb://127.0.0.1:27017/maharati")
      .then(() => console.log("Connected to MongoDB"))
      .catch(console.error);
module.exports = app;
