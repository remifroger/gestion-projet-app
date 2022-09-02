const { errorMessage, status, successMessage } = require('../helpers/status')
const { getCategories, getCategoryById, insertCategory } = require('../services/dbServices')

const Categories = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getCategories()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getById: async (req, res) => {
        const { idCategory } = req.params
        if (idCategory) {
            try {
                const resultQuery = await getCategoryById(idCategory)
                successMessage.data = resultQuery.rows
                return res.status(status.success).send(successMessage)
            } catch (error) {
                console.log(error)
                errorMessage.error = 'Une erreur s\'est produite'
                return res.status(status.error).send({ "text": errorMessage })
            }
        }
    },
    insertById: async (req, res) => {
        const params = req.body
        if (params.categoryName) {
            try {
                const resultQuery = await insertCategory(params)
                return res.status(status.success).send(successMessage)
            } catch (error) {
                console.log(error)
                errorMessage.error = 'Une erreur s\'est produite'
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
}

module.exports = Categories