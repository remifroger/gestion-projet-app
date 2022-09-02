const { errorMessage, status, successMessage } = require('../helpers/status')

const UserData = {
    getAll: (req, res) => {
        if (req.user === undefined) {
            // The user is not logged in
            res.json({})
        } else {
            res.json({
                user: req.user
            })
        }
    }
}

module.exports = UserData