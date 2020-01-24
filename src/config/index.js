require('dotenv').config()

const config = {
    PORT: process.env.PORT,
    URL: process.env.URI_DB
}

module.exports = config