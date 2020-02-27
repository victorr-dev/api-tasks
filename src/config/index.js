require('dotenv').config()

const config = {
    PORT: process.env.PORT,
    URL: process.env.URI_DB,
    SEED: process.env.SEED,
    TOKEN_EXPIRE: process.env.TOKEN_EXPIRE
}

module.exports = config