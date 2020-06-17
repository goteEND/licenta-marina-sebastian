const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

if (process.env.NODE_ENV === "development") {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const config = require("./webpack.config");
  const compiler = webpack(config);

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      writeToDisk: filePath => {
        return /.*\.html$/.test(filePath);
      }
    })
  );
}

// Use the passport Middleware
app.use(passport.initialize());
// Bring in the Passport Strategy
require("./config/passport")(passport);

app.use(bodyParser.json());

const users = require("./routes/api/users");
app.use("/api/users", users);

const api = require("./routes/api/api");
app.use("/api", api);

app.use("/dist", express.static(process.cwd() + "/dist"));

app.use((req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.listen(3000, () => console.log("Server Listening on PORT 3000"));
