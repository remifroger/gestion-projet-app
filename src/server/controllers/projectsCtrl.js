const { errorMessage, status, successMessage } = require('../helpers/status')
const { getProjects, getProjectById, getProjectsByIdGroup, getProjectsByIdMember, getProjectsByIdStatut, getProjectsByType, getProjectsByLink, updateProject, insertProject, insertProjectRelation, removeProjectRelation, deleteProject } = require('../services/dbServices')

const Projects = {
    getAll: async (req, res) => {
        try {
            const resultQuery = await getProjects()
            successMessage.data = resultQuery.rows
            return res.status(status.success).send(successMessage)
        } catch (error) {
            errorMessage.error = 'Une erreur s\'est produite'
            return res.status(status.error).send({ "text": errorMessage })
        }
    },
    getByIdProject: async (req, res) => {
        const { idProject } = req.params
        if (idProject) {
            try {
                const resultQuery = await getProjectById(idProject)
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
        const { type } = req.query
        if (idGroup && type) {
            try {
                const resultQuery = await getProjectsByIdGroup(idGroup, type)
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
        const params = req.query
        if (idMember && params) {
            try {
                const resultQuery = await getProjectsByIdMember(idMember, params)
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
        const params = req.query
        if (idStatut && params.annee && params.type) {
            try {
                const resultQuery = await getProjectsByIdStatut(idStatut, params.annee, params.type)
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
    getByType: async (req, res) => {
        const { type } = req.params
        if (type) {
            try {
                const resultQuery = await getProjectsByType(type)
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
    getByLink: async (req, res) => {
        const params = req.query
        if (params.idRoutine && params.type) {
            try {
                const resultQuery = await getProjectsByLink(params)
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
    updateById: async (req, res) => {
        const params = req.body
        if (params.idProject && params.dateDebut && params.dateFin) {
            try {
                const resultQuery = await updateProject(params)
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
    createProject: async (req, res) => {
        const params = req.body
        if (params.idGroup && params.libProject && params.descProject && params.dateDebut && params.dateFin && params.idStatut && params.type) {
            try {
                const resultQuery = await insertProject(params)
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
    createProjectRelation: async (req, res) => {
        const params = req.body
        if (params.idProject && params.idRoutine) {
            try {
                const resultQuery = await insertProjectRelation(params)
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
    deleteProjectRelation: async (req, res) => {
        const params = req.body
        if (params.idProject && params.idRoutine) {
            try {
                const resultQuery = await removeProjectRelation(params)
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
    deleteByIdProject: async (req, res) => {
        const { idProject } = req.params
        if (idProject) {
            try {
                const resultQuery = await deleteProject(idProject)
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

module.exports = Projects