require("dotenv").config();
const config = {
    TOKEN: process.env.TOKEN,
    DB_URL: "mongodb://127.0.0.1:27017/mytask",
    PORT: process.env.PORT || 4000,
    jwtSecretKey: process.env.JWT_SECRET_KEY
}

module.exports = config