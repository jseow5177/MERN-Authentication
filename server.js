require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

// User route
const users = require("./routes/api/users");

const app = express();

// bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB successfully connected!"))
  .catch((error) => console.log(error));

// Passport middleware
app.use(passport.initialize());
// Passport config
// ./config/passport returns a function. The function argument is "passport"
// Same as var Passport = require("./config/passport"); Passport(passport);
require("./config/passport")(passport);
// Set up user route
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
