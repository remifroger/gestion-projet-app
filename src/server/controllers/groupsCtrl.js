const { errorMessage, status, successMessage } = require('../helpers/status')
const { getGroups, getGroupById } = require('../services/dbServices')

const Groups = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getGroups()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            console.log(error)
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getByIdGroup: async (req, res) => {
        const { idGroup } = req.params
        if (idGroup) {
            try {
                const resultQuery = await getGroupById(idGroup)
                successMessage.data = resultQuery.rows
                return res.status(status.success).send(successMessage)
            } catch (error) {
                errorMessage.error = 'Une erreur s\'est produite'
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    }
}

module.exports = Groups