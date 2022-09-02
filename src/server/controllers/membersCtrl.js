const nodemailer = require('nodemailer')
const { errorMessage, status, successMessage } = require('../helpers/status')
const { getMembers, getMemberById, getMembersByIdProject, getMembersByIdGroup, getMemberProject, updateMemberProject, insertMemberProject, removeMemberProject } = require('../services/dbServices')

const Members = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getMembers()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getByIdMember: async (req, res) => {
        const { id } = req.params
        if (id) {
            try {
                const resultQuery = await getMemberById(id)
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
                const resultQuery = await getMembersByIdProject(idProject)
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
    getByIdGroup: async (req, res) => {
        const { idGroup } = req.params
        if (idGroup) {
            try {
                const resultQuery = await getMembersByIdGroup(idGroup)
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
    getByIdMemberIdProject: async (req, res) => {
        const { idProject, idMember } = req.params
        if (idProject && idMember) {
            try {
                const resultQuery = await getMemberProject(req.params)
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
    updateByIdMemberProject: async (req, res) => {
        const params = req.body
        if (params.idProject && params.idMember && params.roleMembre && params.nbJours) {
            try {
                const resultQuery = await updateMemberProject(params)
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
    insertByIdMemberProject: async (req, res) => {
        const params = req.body
        if (params.idProject && params.idMember && params.roleMembre && params.nbJours) {
            try {
                const resultQuery = await insertMemberProject(params)
                return res.status(status.success).send(successMessage)
            } catch (error) {
                errorMessage.error = String(error)
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    removeByIdMemberProject: async (req, res) => {
        const params = req.body
        if (params.idProject && params.idMember) {
            try {
                const resultQuery = await removeMemberProject(params)
                return res.status(status.success).send(successMessage)
            } catch (error) {
                errorMessage.error = String(error)
                return res.status(status.error).send({ "text": errorMessage })
            }
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    sendMail: async (req, res) => {
        const params = req.body
        if (params.mailMember && params.text && params.idTicket) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'mirefrog35@gmail.com',
                    pass: 'gvbldsdjzhwczopz'
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
            const mailOptions = {
                from: 'mirefrog35@gmail.com',
                to: params.mailMember,
                subject: '[Ne pas répondre] Gestionnaire de projet - nouvelle notification',
                html: `<a href="http://srv-gitlab.audiar.net:8094/ticketView?idTicket=${params.idTicket}" target="_blank">Vous avez été affecté à un nouveau ticket via le gestionnaire projet</a>
                Ticket : ${params.text}`
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    errorMessage.error = String('Erreur à l\'envoi')
                    return res.status(status.error).send({ "text": errorMessage })
                } else {
                    return res.status(status.success).send()
                }
            })
        } else {
            errorMessage.error = 'Les paramètres sont incorrects'
            return res.status(status.error).send({ "text": errorMessage })
        }
    }
}

module.exports = Members