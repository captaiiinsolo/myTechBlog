// imports path module (used to join paths)
const path = require("path");

// imports express module (used to create new Express app)
const express = require("express");

// imports express-session module (used to manage user sessions)
const session = require("express-session");

// imports express-handlebars (used to setup handlebars as the template engine)
const exphbs = require("express-handlebars");

// imports connect-session-sequelize (used to create a new instance of session store. Session store is used to store session data in the db using Sequelize)
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3002;

const sess = {
  secret: "asd6g5f4a6sd512ga6sd5g1v6sa5hjjghd65g",
  cookie: {
    // specifies how long a cookie should remain valid
    maxAge: 3600,

    // prevents client-side scripts from accessing cookies
    httpOnly: true,

    // ensures that cookies are only sent over HTTPS connections
    secure: false,

    // ensures that cookies are only sent when requests originate from the same site specified in its value of 'strict'
    sameSite: "strict",
  },

  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// sets up handlebars as the template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// configures the server to use JSON data
app.use(express.json());

// configures the server to use URL encoded data
app.use(express.urlencoded({ extended: true }));

// configures the server to serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Adds routes to the app. Allows app to respond to requests for different URLs and perform different actions based on the request
app.use(routes);

// uses Sequelize to sync db to app. force: false tells sequelize not to drop any existing tables when syncing
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(
      `\nServer running on port ${PORT}. Please visit http://localhost:${PORT}`
    )
  );
});
