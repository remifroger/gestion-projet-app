const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")
const { pool } = require("../db/connect.js");
const tableUsers = process.env.PGTABLEUSER // tableUsers must have at least 3 named columns: username (string), password (string), id (integer)
 
let initialize = (passport) => {
    const authenticateUser = (username, password, done) => {
        pool.query(
            `SELECT * FROM ${tableUsers} WHERE username = $1`,
            [username],
            (err, results) => {
                if (err) {
                    throw err
                }
                if (results.rows.length > 0) {
                    const user = results.rows[0]
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            console.log(err)
                        }
                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: "Mot de passe incorrect" })
                        }
                    })
                } else {
                    return done(null, false, {
                        message: "Cet utilisateur n'existe pas"
                    })
                }
            }
        )
    }  
    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password" },
            authenticateUser
        )
    )
    /* Stores user details inside session. serializeUser determines which data of the user object should be stored in the session. 
    The result of the serializeUser method is attached to the session as req.session.passport.user = {}. 
    Here for instance, it would be (as we provide the user id as the key) req.session.passport.user = {id: 'xyz'} */
    passport.serializeUser((user, done) => done(null, user.id_membre))
    /* In deserializeUser that key is matched with the in memory array / database or any data resource.
    The fetched object is attached to the request object as req.user */
    passport.deserializeUser((id_membre, done) => {
        pool.query(`SELECT * FROM ${tableUsers} WHERE id_membre = $1`, [id_membre], (err, results) => {
            if (err) {
                return done(err)
            }
            return done(null, results.rows[0])
        })
    })
}

module.exports = initialize