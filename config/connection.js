const { Pool } = require('pg');
require('dotenv').config()

const connection = new Pool({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.databaseport,
})

module.exports = connection;