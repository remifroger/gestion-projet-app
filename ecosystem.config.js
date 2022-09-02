const SESSION = process.env.SESSION
const PG_HOST = process.env.PGHOST
const PG_DB = process.env.PGDATABASE
const PG_PORT = process.env.PGPORT
const PG_USER = process.env.PGUSER
const PG_PWD = process.env.PGPASSWORD
const PG_TABLE_USER_ACCESS = process.env.PGTABLEUSER

module.exports = {
    apps: [{
        name: 'gestion-projet-app',
        script: './src/server/app.js', 
        instances: 1,
        autorestart: true,
        watch: false,
        error_file: '/err/err.log',
        out_file: '/err/out.log',
        log_file: '/err/combined.log',
        time: true,
        env: {
            NODE_ENV: 'development',
            PORT: 8094,
            SESSION: SESSION,
            PGHOST: PG_HOST,
            PGDATABASE: PG_DB,
            PGPORT: PG_PORT,
            PGUSER: PG_USER,
            PGPASSWORD: PG_PWD,
            PGTABLEUSER: PG_TABLE_USER_ACCESS
        }, 
        env_production: {
            NODE_ENV: 'production',
            PORT: 8092,
            SESSION: SESSION,
            PGHOST: PG_HOST,
            PGDATABASE: PG_DB,
            PGPORT: PG_PORT,
            PGUSER: PG_USER,
            PGPASSWORD: PG_PWD,
            PGTABLEUSER: PG_TABLE_USER_ACCESS
        }
    }],
};