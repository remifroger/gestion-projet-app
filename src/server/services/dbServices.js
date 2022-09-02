const { pool } = require('../db/connect.js')
const activeYear = new Date().getFullYear()

const getMembers = async () => {
    try {
        const queryResult = await pool.query(`SELECT a.*, b.* FROM _a_gestion_projet.membres a LEFT JOIN _a_gestion_projet.v_membres_metrics b ON a.id_membre = b.id_membre`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun membre n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getMemberById = async (idMember) => {
    try {
        const queryResult = await pool.query(`SELECT a.*, b.* FROM _a_gestion_projet.membres a LEFT JOIN _a_gestion_projet.v_membres_metrics b ON a.id_membre = b.id_membre WHERE a.id_membre = ANY($1)`, [[idMember]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun membre n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getMembersByIdProject = async (idProject) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.membres a LEFT JOIN _a_gestion_projet.projet_membre b ON a.id_membre = b.id_membre WHERE b.id_projet = ANY($1)`, [[idProject]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun membre n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}
const getMembersByIdGroup = async (idGroup) => {
    try {
        const queryResult = await pool.query(`SELECT a.*, b.* FROM _a_gestion_projet.membres a LEFT JOIN _a_gestion_projet.v_membres_metrics b ON a.id_membre = b.id_membre WHERE a.id_groupe = ANY($1)`, [[idGroup]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun membre n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getMemberProject = async (params) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.projet_membre WHERE id_projet = $1 AND id_membre = $2`, [params.idProject, params.idMember])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const updateMemberProject = async (params) => {
    try {
        const queryResult = await pool.query(`UPDATE _a_gestion_projet.projet_membre SET role_membre = $1, nb_jours = $2 WHERE id_projet = $3 AND id_membre = $4`, [params.roleMembre, params.nbJours, params.idProject, params.idMember])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const insertMemberProject = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.projet_membre(id_membre, id_projet, role_membre, nb_jours) VALUES ($1, $2, $3, $4)`, [params.idMember, params.idProject, params.roleMembre, params.nbJours])
        return queryResult
    } catch (e) {
        if (e.code === '23505') {
            throw new Error('Membre déjà affecté à ce projet')
        } else {
            throw new Error(e.message)
        }
    }
}

const removeMemberProject = async (params) => {
    try {
        const queryResult = await pool.query(`DELETE FROM _a_gestion_projet.projet_membre WHERE id_membre = $1 AND id_projet = $2`, [params.idMember, params.idProject])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getGroups = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.groupes`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun groupe n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getGroupById = async (idGroup) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.groupes WHERE id_groupe = ANY($1)`, [[idGroup]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun groupe n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjects = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.projets WHERE id_statut IN(1, 2) AND (${activeYear} BETWEEN date_part('year', date_debut) AND date_part('year', date_fin)) ORDER BY lib_projet`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjectById = async (idProject) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.projets a LEFT JOIN _a_gestion_projet.statuts c ON a.id_statut = c.id_statut WHERE id_projet = ANY($1) ORDER BY lib_projet`, [[idProject]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjectsByIdGroup = async (idGroup, type) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_projets_infos WHERE id_groupe = ANY($1) AND id_statut IN(1, 2) AND (${activeYear} BETWEEN date_part('year', date_debut) AND date_part('year', date_fin)) AND type_projet = $2 ORDER BY lib_projet`, [[idGroup], type])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjectsByIdMember = async (idMember, params) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.projets a LEFT JOIN _a_gestion_projet.projet_membre b ON a.id_projet = b.id_projet LEFT JOIN _a_gestion_projet.statuts c ON a.id_statut = c.id_statut WHERE b.id_membre = ANY($1) AND a.type_projet = $2 AND a.id_statut = ANY($3) ORDER BY lib_projet`, [[idMember], params.type, [params.idStatut]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjectsByIdStatut = async (idStatut, annee, type) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.projets WHERE id_statut = $1 AND ($2 BETWEEN date_part('year', date_debut) AND date_part('year', date_fin)) AND type_projet = $3 ORDER BY lib_projet`, [idStatut, annee, type])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjectsByType = async (type) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.projets WHERE type_projet = $1 ORDER BY lib_projet`, [type])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getProjectsByLink = async (params) => {
    try {
        let query
        if (params.type === 'Routine') {
            query = `SELECT * FROM _a_gestion_projet.projet_routine a LEFT JOIN _a_gestion_projet.projets b ON a.id_projet = b.id_projet LEFT JOIN _a_gestion_projet.statuts c ON b.id_statut = c.id_statut WHERE a.id_routine = $1 AND b.type_projet = 'Projet' ORDER BY b.lib_projet`
        } else if (params.type === 'Projet') {
            query = `SELECT * FROM _a_gestion_projet.projet_routine a LEFT JOIN _a_gestion_projet.projets b ON a.id_routine = b.id_projet LEFT JOIN _a_gestion_projet.statuts c ON b.id_statut = c.id_statut WHERE a.id_projet = $1 AND b.type_projet = 'Routine' ORDER BY b.lib_projet`
        } else {
            throw new Error("Ce type n'existe pas (Projet ou Routine")
        }
        const queryResult = await pool.query(query, [params.idRoutine])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun projet n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}


const updateProject = async (params) => {
    try {
        const queryResult = await pool.query(`UPDATE _a_gestion_projet.projets SET description = $2, date_debut = $3, date_fin = $4, dossier_reseau = $5, url_gitlab = $6, url_preprod = $7, url_prod = $8, id_statut = $9, type_projet = $10 WHERE id_projet = $1`, [params.idProject, params.descProject, params.dateDebut, params.dateFin, params.dossierReseau, params.urlGitlab, params.urlPreprod, params.urlProd, params.idStatut, params.type])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const insertProject = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.projets(lib_projet, description, date_debut, date_fin, dossier_reseau, url_gitlab, url_preprod, url_prod, id_groupe, id_statut, type_projet) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [params.libProject, params.descProject, params.dateDebut, params.dateFin, params.dossierReseau, params.urlGitlab, params.urlPreprod, params.urlProd, params.idGroup, params.idStatut, params.type])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const insertProjectRelation = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.projet_routine(id_projet, id_routine) VALUES ($1, $2)`, [params.idProject, params.idRoutine])
        return queryResult
    } catch (e) {
        if (e.code === '23505') {
            throw new Error('Routine déjà affectée à ce projet')
        } else {
            throw new Error(e.message)
        }
    }
}

const removeProjectRelation = async (params) => {
    try {
        const queryResult = await pool.query(`DELETE FROM _a_gestion_projet.projet_routine WHERE id_projet = $1 AND id_routine = $2`, [params.idProject, params.idRoutine])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteProject = async (idProject) => {
    try {
        const queryResult = await pool.query(`DELETE FROM _a_gestion_projet.projets WHERE id_projet = ANY($1)`, [[idProject]])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTickets = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_tickets_infos ORDER BY date_ticket DESC`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun ticket n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTicketById = async (idTicket) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_tickets_infos WHERE id_ticket = ANY($1) ORDER BY date_ticket DESC`, [[idTicket]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun ticket n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTicketsByIdMember = async (idMember) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_tickets_infos WHERE id_membre = ANY($1) ORDER BY date_ticket DESC`, [[idMember]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun ticket n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTicketsByIdProject = async (idProject) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_tickets_infos WHERE id_projet = ANY($1) ORDER BY date_ticket DESC`, [[idProject]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun ticket n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTicketsByIdStatut = async (idStatut) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_tickets_infos WHERE id_statut = ANY($1) ORDER BY date_ticket DESC`, [[idStatut]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun ticket n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTicketsByIdStatutIdProject = async (params) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_tickets_infos WHERE id_statut = $1::integer AND id_projet = $2::integer ORDER BY date_ticket DESC`, [params.idStatut, params.idProject])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun ticket n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const createTicket = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.tickets(id_membre, id_projet, id_statut, id_urgence, date_ticket, id_membre_affecte, texte) VALUES($1, $2, $3, $4, $5, $6, $7)`, [params.idMember, params.idProject, params.idStatut, params.idUrgence, params.dateTicket, params.idMembersAffected, params.text])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const createTicketMembersAffected = async (params) => {
    try {
        let values = ``
        params.idMembersAffected.forEach((m, i, array) => {
            if (i === array.length - 1) { 
                values += `(${params.idTicket}, ${m})`
            } else {
                values += `(${params.idTicket}, ${m}), `
            }
        })
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.ticket_membre_affecte(id_ticket, id_membre) VALUES ${values}`)
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteTicket = async (idTicket) => {
    try {
        const queryResult = await pool.query(`DELETE FROM _a_gestion_projet.tickets WHERE id_ticket = ANY($1)`, [[idTicket]])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const updateTicket = async (params) => {
    try {
        const queryResult = await pool.query(`UPDATE _a_gestion_projet.tickets SET id_statut = $1, id_urgence = $2, texte = $4 WHERE id_ticket = $3`, [params.idStatut, params.idUrgence, params.idTicket, params.texte])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getComments = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_commentaires_infos ORDER BY date_commentaire DESC`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun commentaire n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCommentById = async (idComment) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_commentaires_infos WHERE id_commentaire = ANY($1)`, [[idComment]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun commentaire n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCommentsByIdMember = async (idMember) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_commentaires_infos WHERE id_membre = ANY($1) ORDER BY date_commentaire DESC`, [[idMember]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun commentaire n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCommentsByIdTicket = async (idTicket) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_commentaires_infos WHERE id_ticket = ANY($1) ORDER BY date_commentaire DESC`, [[idTicket]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun commentaire n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCommentsByIdTool = async (idTool) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_commentaires_outils_infos WHERE id_outil = ANY($1) ORDER BY date_commentaire DESC`, [[idTool]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun commentaire n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const createComment = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.commentaires(id_membre, id_ticket, texte, date_commentaire) VALUES($1, $2, $3, $4)`, [params.idMember, params.idTicket, params.text, params.dateTicket])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const createCommentTool = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.commentaires_outils(id_membre, id_outil, texte, date_commentaire) VALUES($1, $2, $3, $4)`, [params.idMember, params.idTool, params.text, params.dateTicket])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getStatuts = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.statuts`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun statut n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTicketUrgence = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.tickets_urgence`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun degré d'urgence n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCategories = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_categories_infos ORDER BY lib_categorie`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucune catégorie n'a été trouvée`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getCategoryById = async (idCategory) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_categories_infos WHERE id_cat = ANY($1)`, [[idCategory]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucune catégorie n'a été trouvée`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const insertCategory = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.categories(lib_categorie) VALUES ($1)`, [params.categoryName])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getTools = async () => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_outils_infos ORDER BY lib_outil`)
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun outil n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getToolById = async (idTool) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_outils_infos WHERE id_outil = ANY($1)`, [[idTool]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun outil n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const getToolsByCategory = async (idCategory) => {
    try {
        const queryResult = await pool.query(`SELECT * FROM _a_gestion_projet.v_outils_infos WHERE id_categorie = ANY($1) ORDER BY lib_outil`, [[idCategory]])
        if (queryResult.rows[0] === undefined) {
            throw new Error(`Aucun outil n'a été trouvé`)
        }
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const insertTool = async (params) => {
    try {
        const queryResult = await pool.query(`INSERT INTO _a_gestion_projet.boite_outils(lib_outil, desc_outil, url, id_categorie) VALUES ($1, $2, $3, $4)`, [params.nameTool, params.descTool, params.urlTool, params.idCategory])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteTool = async (idTool) => {
    try {
        const queryResult = await pool.query(`DELETE FROM _a_gestion_projet.boite_outils WHERE id_outil = ANY($1)`, [[idTool]])
        return queryResult
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    getMembers,
    getMemberById,
    getMembersByIdProject,
    getMembersByIdGroup,
    getMemberProject,
    updateMemberProject,
    insertMemberProject,
    removeMemberProject,
    getGroups,
    getGroupById,
    getProjects,
    getProjectById,
    getProjectsByIdGroup,
    getProjectsByIdMember,
    getProjectsByIdStatut,
    getProjectsByType,
    getProjectsByLink,
    updateProject,
    insertProject,
    insertProjectRelation,
    removeProjectRelation,
    deleteProject,
    getTickets,
    getTicketById,
    getTicketsByIdMember,
    getTicketsByIdProject,
    getTicketsByIdStatut,
    getTicketsByIdStatutIdProject,
    createTicket,
    createTicketMembersAffected,
    deleteTicket,
    updateTicket,
    getComments,
    getCommentById,
    getCommentsByIdMember,
    getCommentsByIdTicket,
    getCommentsByIdTool,
    createComment,
    createCommentTool,
    getStatuts,
    getTicketUrgence,
    getCategories,
    getCategoryById,
    insertCategory,
    getTools,
    getToolById,
    getToolsByCategory,
    insertTool,
    deleteTool,
}