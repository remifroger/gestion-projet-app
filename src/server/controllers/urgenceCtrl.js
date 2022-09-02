const { errorMessage, status, successMessage } = require('../helpers/status')
const { getTicketUrgence } = require('../services/dbServices')

const Urgence = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getTicketUrgence()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    }
}

module.exports = Urgence