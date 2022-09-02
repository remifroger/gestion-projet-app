const { errorMessage, status, successMessage } = require('../helpers/status')
const { getTickets, getTicketById, getTicketsByIdMember, getTicketsByIdProject, getTicketsByIdStatut, getTicketsByIdStatutIdProject, createTicket, createTicketMembersAffected, deleteTicket, updateTicket } = require('../services/dbServices')

const Tickets = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getTickets()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getByIdTicket: async (req, res) => {
        const { idTicket } = req.params
        if (idTicket) {
            try {
                const resultQuery = await getTicketById(idTicket)
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
                const resultQuery = await getTicketsByIdMember(idMember)
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
    getByIdProject: async (req, res) => {
        const { idProject } = req.params
        if (idProject) {
            try {
                const resultQuery = await getTicketsByIdProject(idProject)
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
    getByIdStatut: async (req, res) => {
        const { idStatut } = req.params
        if (idStatut) {
            try {
                const resultQuery = await getTicketsByIdStatut(idStatut)
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
    getByIdStatutIdProject: async (req, res) => {
        const { idStatut, idProject } = req.params
        if (idStatut && idProject) {
            try {
                const resultQuery = await getTicketsByIdStatutIdProject(req.params)
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
    insertTicket: async (req, res) => {
        const params = req.body
        if (params.idMember && params.idProject && params.idStatut && params.idUrgence && params.text) {
            try {
                const resultQuery = await createTicket(params)
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
    insertTicketMembersAffected: async (req, res) => {
        const params = req.body
        if (params.idMembersAffected && params.idTicket) {
            try {
                const resultQuery = await createTicketMembersAffected(params)
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
    removeTicket: async (req, res) => {
        const { idTicket } = req.params
        if (idTicket) {
            try {
                const resultQuery = await deleteTicket(idTicket)
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
    updateTicketById: async (req, res) => {
        const params = req.body
        if (params.idTicket, params.idStatut, params.idUrgence) {
            try {
                const resultQuery = await updateTicket(params)
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

module.exports = Tickets