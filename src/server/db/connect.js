require('dotenv').config()
const pg = require('pg')
const winston = require('winston')

const dbConfig = {
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
	connectionTimeoutMillis: 40000,
	idleTimeoutMillis: 40000,
	max: 20
}

const pool = new pg.Pool(dbConfig)
pool.on('error', function (err) {
	console.error('IDLE client error', err.message, err.stack)
	process.exit(-1)
})

module.exports = {
	pool,
}