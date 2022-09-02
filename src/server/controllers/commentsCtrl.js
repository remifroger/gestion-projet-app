const { errorMessage, status, successMessage } = require('../helpers/status')
const { getComments, getCommentById, getCommentsByIdMember, getCommentsByIdTicket, getCommentsByIdTool, createComment, createCommentTool } = require('../services/dbServices')

const Comments = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getComments()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getByIdComment: async (req, res) => {
        const { idComment } = req.params
        if (idComment) {
            try {
                const resultQuery = await getCommentById(idComment)
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
    getByIdMember: async (req, res) => {
        const { idMember } = req.params
        if (idMember) {
            try {
                const resultQuery = await getCommentsByIdMember(idMember)
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
    getByIdTicket: async (req, res) => {
        const { idTicket } = req.params
        if (idTicket) {
            try {
                const resultQuery = await getCommentsByIdTicket(idTicket)
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
    getByIdTool: async (req, res) => {
        const { idTool } = req.params
        if (idTool) {
            try {
                const resultQuery = await getCommentsByIdTool(idTool)
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
    insertComment: async (req, res) => {
        const params = req.body
        if (params.idMember && params.idTicket && params.text) {
            try {
                const resultQuery = await createComment(params)
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
    insertCommentTool: async (req, res) => {
        const params = req.body
        console.log(params)
        if (params.idMember && params.idTool && params.text) {
            try {
                const resultQuery = await createCommentTool(params)
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

module.exports = Comments