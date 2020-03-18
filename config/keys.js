require("dotenv").config(); // Access .env file

module.exports = {
  mongoURI: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-tmjin.mongodb.net/userDB`,
  secretOrKey: `${process.env.SECRET}`
}
