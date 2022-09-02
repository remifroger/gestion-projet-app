const { errorMessage, status, successMessage } = require('../helpers/status')
const { getTools, getToolById, getToolsByCategory, insertTool, deleteTool } = require('../services/dbServices')

const Tools = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getTools()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getByIdTool: async (req, res) => {
        const { idTool } = req.params
        if (idTool) {
            try {
                const resultQuery = await getToolById(idTool)
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
    },
    getByIdCategory: async (req, res) => {
        const { idCategory } = req.params
        if (idCategory) {
            try {
                const resultQuery = await getToolsByCategory(idCategory)
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
    },
    insertById: async (req, res) => {
        const params = req.body
        if (params.nameTool && params.descTool && params.urlTool && params.idCategory) {
            try {
                const resultQuery = await insertTool(params)
                return res.status(status.success).send(successMessage)
            } catch (error) {
                errorMessage.error = 'Une erreur s\'est produite'
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    deleteById: async (req, res) => {
        const { idTool } = req.params
        if (idTool) {
            try {
                const resultQuery = await deleteTool(idTool)
                return res.status(status.success).send(successMessage)
            } catch (error) {
                errorMessage.error = 'Une erreur s\'est produite'
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
}

module.exports = Tools