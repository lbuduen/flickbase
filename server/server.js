require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(mongoURI);

const passport = require("passport");
const { jwtStrategy } = require("./middlewares/passport");

const routes = require("./routes");

const app = express();

app.use(bodyParser.json());

app.use(xss());
app.use(mongoSanitize());

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/api", routes);

app.use(express.static("client/build"));
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
