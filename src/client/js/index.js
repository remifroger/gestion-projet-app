/*
Some tips for a better overall understanding
--------------------------------------------
This file "index.js" is called on all client side routes, functions run according on the presence or not of a specific DOM element (if ($("#myIdElement").length) { call function, etc. })
*/

"use strict"

import './wrapper/import-jquery.js'
import 'jquery-ui-dist/jquery-ui.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-select'
import 'bootstrap-select/dist/css/bootstrap-select.min.css'
import '../css/main.css'
import typeahead from '@ceyarts/bootstrap-typeahead'

$(function () {
    const getUrlParameter = (sParam) => {
        let sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=')
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
            }
        }
    }

    if (document.querySelector('form#byGroup')) {
        fetch(`/api/groups`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('form#byGroup').childNodes[0].insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun groupe trouvé</div></div>')
                    throw new Error("Aucun groupe trouvé")
                }
            })
            .then(res => {
                if (res.data.length) {
                    res.data.forEach((item) => {
                        document.querySelector('select#find-group').insertAdjacentHTML('beforeend', '<option value="' + item.id_groupe + '">' + item.lib_groupe + '</option>')
                    })
                }
            })
            .catch(() => {
                document.querySelector('form#byGroup').childNodes[0].insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun groupe trouvé</div></div>')
                return
            })
    }

    if (document.querySelector('#group-name')) {
        const idGroup = getUrlParameter('idGroup')
        fetch(`/api/group/${idGroup}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#group-name').childNodes[0].insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun groupe trouvé</div></div>')
                    throw new Error("Aucun groupe trouvé")
                }
            })
            .then(res => {
                if (res.data.length) {
                    document.querySelector('#group-name').append('Groupe : ' + res.data[0].lib_groupe)
                }
            })
            .catch(() => {
                document.querySelector('#group-name').childNodes[0].insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun groupe trouvé</div></div>')
                return
            })
    }

    if (document.querySelector('#byMember')) {
        const idGroup = getUrlParameter('idGroup')
        fetch(`/api/members/group/${idGroup}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#listMembers').childNodes[0].insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.data.length) {
                    res.data.forEach((item) => {
                        document.querySelector('#listMembers').insertAdjacentHTML('beforeend', `<a href="/memberView?idMember=${item.id_membre}" class="list-group-item" id=${item.id_membre}>${item.prenom} ${item.nom} <div class="progress"><div class="progress-bar progress-bar-striped ${(item.ratio_dispo) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${item.ratio_dispo}%" aria-valuenow="${item.ratio_dispo}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between"></div></a>`)
                    })
                }
            })
            .catch((e) => {
                document.querySelector('#listMembers').childNodes[0].insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    }

    const refreshListByRoutine = (target) => {
        if (document.querySelector(target)) {
            const idGroup = getUrlParameter('idGroup')
            fetch(`/api/projects/group/${idGroup}?type=Routine`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#listBackend').innerHTML = ''
                        document.querySelector('#listBackend').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucune routine trouvée</div></div>')
                        throw new Error("Aucune routine trouvée")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector('#listBackend').innerHTML = ''
                        res.data.forEach((item, i) => {
                            if (i < 10) {
                                document.querySelector('#listBackend').insertAdjacentHTML('beforeend', `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet} <div class="badge badge-dark ml-2 mb-0">Projets liés : ${(item.nb_relations) ? item.nb_relations : 0}</div></a>`)
                            }
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector('#listBackend').innerHTML = ''
                    document.querySelector('#listBackend').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucune routine trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#byBackend')) {
        refreshListByRoutine('#byBackend')
    }

    const refreshListByProject = (target) => {
        if (document.querySelector(target)) {
            const idGroup = getUrlParameter('idGroup')
            fetch(`/api/projects/group/${idGroup}?type=Projet`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#listProjects').innerHTML = ''
                        document.querySelector('#listProjects').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                        throw new Error("Aucun projet trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector('#listProjects').innerHTML = ''
                        res.data.forEach((item, i) => {
                            if (i < 10) {
                                const nbJoursProj = Math.round(Math.abs(new Date(item.date_fin).getTime() - new Date(item.date_debut).getTime()) / (1000 * 60 * 60 * 24))
                                const nbJoursReste = Math.round((new Date(item.date_fin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                                const ratio = (nbJoursReste < nbJoursProj) ? (100 - ((nbJoursReste * 100) / nbJoursProj)) : 0
                                document.querySelector('#listProjects').insertAdjacentHTML('beforeend', `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet} (${nbJoursReste} jours restants)<div class="progress"><div class="progress-bar progress-bar-striped ${(ratio) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${ratio}%" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between"></div></a>`)
                            }
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector('#listProjects').innerHTML = ''
                    document.querySelector('#listProjects').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#byProject')) {
        refreshListByProject('#byProject')
    }

    const refreshListTickets = (target) => {
        if (document.querySelector(target)) {
            fetch(`/api/tickets`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(tagret).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun ticket trouvé</div></div>')
                        throw new Error("Aucun ticket trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ""
                        res.data.forEach((item, i) => {
                            if (i < 10) {
                                document.querySelector(target).insertAdjacentHTML('beforeend',
                                    `<a href="/ticketView?idTicket=${item.id_ticket}" class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_ticket}>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                            <small>${item.date_ticket.toLocaleString()}</small>
                                        </div>
                                        <small>Projet associé : ${item.lib_projet}</small>
                                        <p class="my-4 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                        <small>${item.nb_commentaires} ${(item.nb_commentaires > 1) ? 'commentaires' : 'commentaire'}</small>
                                        <small><span class="badge badge-${item.lib_class} ml-2">${item.lib_urgence}</span></small>
                                    </a>`)
                            }
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun ticket trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#listTickets')) {
        refreshListTickets('#listTickets')
    }

    const refreshMemberInfo = (target) => {
        if (document.querySelector(target)) {
            const idMember = getUrlParameter('idMember')
            fetch(`/api/member/${idMember}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                        throw new Error("Aucun membre trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).append('Membre : ' + res.data[0].prenom + ' ' + res.data[0].nom)
                        document.querySelector('#member-infos').innerHTML = ''
                        document.querySelector('#member-infos').insertAdjacentHTML('beforeend', `<div class="progress"><div class="progress-bar progress-bar-striped ${(res.data[0].ratio_dispo) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${res.data[0].ratio_dispo}%" aria-valuenow="${res.data[0].ratio_dispo}" aria-valuemin="0" aria-valuemax="100"></div></div>`)
                        document.querySelector('#member-infos').insertAdjacentHTML('beforeend', `<p class="mt-2">${res.data[0].nb_jours_proj} jours occupés sur ${res.data[0].nb_jours_travailles} possibles</p>`)
                    }
                })
                .catch(() => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#member-name')) {
        refreshMemberInfo('#member-name')
    }

    const refreshProjectMember = (target, typeProj, idStatut) => {
        if (document.querySelector(target)) {
            if (document.querySelector('select#memberProjectsByType')) {
                document.querySelector('select#memberProjectsByType').value = typeProj
                const idMember = getUrlParameter('idMember')
                fetch(`/api/projects/member/${idMember}?type=${typeProj}&idStatut=${idStatut}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            document.querySelector(target).innerHTML = ''
                            document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start">Aucun projet trouvé</div>')
                            throw new Error("Aucun projet trouvé")
                        }
                    })
                    .then(res => {
                        if (res.data.length) {
                            document.querySelector(target).innerHTML = ''
                            res.data.forEach((item) => {
                                document.querySelector(target).insertAdjacentHTML('beforeend',
                                    `<div class="list-group-item list-group-item-action flex-column align-items-start mb-4 border-bottom-0" id=${item.id_projet}>
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">${item.lib_projet}</h5>
                                </div>
                                <div class="my-3">
                                    <small><span class="badge text-${res.data[0].statut_class} border border-${res.data[0].statut_class}">${item.lib_statut}</span></small>
                                    <p class="mb-0"><small>Date début : ${item.date_debut}</small></p>
                                    <p class="mb-0"><small>Date fin : ${item.date_fin}</small></p>
                                </div>
                                <div class="my-3">
                                    <p class="mb-0 text-place"><small>Description : ${item.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</small></p>
                                    <p class="mb-0"><small>Rôle sur le projet : ${item.role_membre}</small></p>
                                    <p class="mb-0"><small>Nombre de jours : ${item.nb_jours}</small></p>
                                </div>
                                <small class="mr-3"><a href="/projectView?idProject=${item.id_projet}">Voir le projet</a></small>
                                <small><a href="#" id="${item.id_projet}" labelProject="${item.lib_projet}" class="editProjectMember" data-toggle="modal" data-target="#panel-edit-project-member">Editer</a></small>
                            </div>`)
                            })
                        }
                    })
                    .then(res => {
                        $('#panel-edit-project-member').on('show.bs.modal', function (e) {
                            fetch(`/api/user_data`)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    } else {
                                        document.querySelector('#projectMember').innerHTML = ""
                                        document.querySelector('#projectMember').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                                        throw new Error("Aucun membre trouvé")
                                    }
                                })
                                .then(res => {
                                    if (res.hasOwnProperty('user')) {
                                        document.querySelector('#memberIdProject').value = res.user.id_membre
                                        document.querySelector('#projectMember').innerHTML = ""
                                        document.querySelector('#projectMember').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                                        document.querySelector('#idProject').value = e.relatedTarget['id']
                                        document.querySelector('#labelProject').innerHTML = ""
                                        document.querySelector('#labelProject').insertAdjacentHTML('beforeend', e.relatedTarget.getAttribute('labelProject'))
                                    } else {
                                        document.querySelector('#projectMember').innerHTML = ""
                                        document.querySelector('#projectMember').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                                        document.querySelector('#sendEditProjectMember').setAttribute('disabled', '')
                                        document.querySelector('#sendEditProjectMember').style.color = 'grey'
                                    }
                                })
                                .catch((e) => {
                                    document.querySelector('#projectMember').innerHTML = ""
                                    document.querySelector('#projectMember').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                                    return
                                })
                            fetch(`/api/member/${parseInt(getUrlParameter('idMember'))}/project/${parseInt(e.relatedTarget['id'])}`)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    }
                                })
                                .then(res => {
                                    if (res.data.length) {
                                        document.querySelector('#roleMember').value = res.data[0].role_membre
                                        document.querySelector('#nbJours').value = res.data[0].nb_jours
                                    }
                                })
                        })
                    })
                    .catch(() => {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start">Aucun projet trouvé</div>')
                        return
                    })
            }
        }
    }

    if (document.querySelector('#listMemberProjectsOpen')) {
        refreshProjectMember('#listMemberProjectsOpen', 'Projet', 1)
    }
    if (document.querySelector('#listMemberProjectsWip')) {
        refreshProjectMember('#listMemberProjectsWip', 'Projet', 2)
    }
    if (document.querySelector('#listMemberProjectsClosed')) {
        refreshProjectMember('#listMemberProjectsClosed', 'Projet', 3)
    }

    const refreshProject = (target) => {
        if (document.querySelector(target)) {
            const idProject = getUrlParameter('idProject')
            fetch(`/api/project/${idProject}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                        throw new Error("Aucun projet trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        const nbJoursProj = Math.round(Math.abs(new Date(res.data[0].date_fin).getTime() - new Date(res.data[0].date_debut).getTime()) / (1000 * 60 * 60 * 24))
                        const nbJoursReste = Math.round((new Date(res.data[0].date_fin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                        const ratio = (nbJoursReste < nbJoursProj) ? (100 - ((nbJoursReste * 100) / nbJoursProj)) : 0
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).append('Projet : ' + res.data[0].lib_projet)
                        document.querySelector('#project-infos').innerHTML = ''
                        document.querySelector('#project-infos').insertAdjacentHTML('beforeend', `<div class="progress"><div class="progress-bar progress-bar-striped ${(ratio) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${ratio}%" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between">${nbJoursReste} jours restants</div></a>`)
                        document.querySelector('#project-infos').insertAdjacentHTML('beforeend',
                            `<div class="mt-2" id="projectListInfos">
                                <small><span class="badge text-${res.data[0].statut_class} border border-${res.data[0].statut_class}">${res.data[0].lib_statut}</span></small>
                                <p class="mb-0 text-place"><small>Description : ${res.data[0].description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</small></p>
                                <p class="mb-0"><small>Date début : ${res.data[0].date_debut}</small></p>
                                <p class="mb-2"><small>Date fin : ${res.data[0].date_fin}</small></p>
                                <p class="mb-0"><small>Dossier réseau : ${(res.data[0].dossier_reseau) ? (res.data[0].dossier_reseau) : ''}</small></p>
                                <p class="mb-0"><small>URL GitLab : <a href="${(res.data[0].url_gitlab) ? (res.data[0].url_gitlab) : '#'}" target="_blank">${(res.data[0].url_gitlab) ? (res.data[0].url_gitlab) : ''}</a></small></p>
                                <p class="mb-0"><small>URL pré-production : <a href="${(res.data[0].url_preprod) ? res.data[0].url_preprod : '#'}" target="_blank">${(res.data[0].url_preprod) ? res.data[0].url_preprod : ''}</a></small></p>
                                <p class="mb-3"><small>URL production : <a href="${(res.data[0].url_prod) ? res.data[0].url_prod : '#'}" target="_blank">${(res.data[0].url_prod) ? res.data[0].url_prod : ''}</a></small></p>
                                <small><a href="" id="editProject" data-toggle="modal" data-target="#panel-edit-project">Editer les informations</a></small>
                            </div>`)
                    }
                })
                .then(() => {
                    fetch(`/api/user_data`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.hasOwnProperty('user')) {
                                if (document.querySelector('#projectListInfos')) {
                                    document.querySelector('#projectListInfos').insertAdjacentHTML('beforeend', `<small><a href="#" class="ml-3" id="deleteProject">Supprimer le projet</a></small>`)
                                }
                            }
                        })
                        .then(() => {
                            if (document.querySelector('#deleteProject')) {
                                document.querySelector('#deleteProject').addEventListener('click', function () {
                                    fetch(`/api/project/${getUrlParameter('idProject')}`)
                                        .then(response => {
                                            if (response.ok) {
                                                return response.json()
                                            }
                                        })
                                        .then(res => {
                                            console.log(res.data)
                                            if (res.data.length) {
                                                console.log(res.data.length)
                                                const idProject = parseInt(getUrlParameter('idProject'))
                                                const deleteMethod = {
                                                    method: 'DELETE',
                                                    headers: {
                                                        'Content-type': 'application/json; charset=UTF-8'
                                                    }
                                                }
                                                fetch(`/api/project/${idProject}`, deleteMethod)
                                                    .then(response => {
                                                        if (response.ok) {
                                                            return response.json()
                                                        }
                                                    })
                                                    .then(() => {
                                                        window.location.href = `/groupView?idGroup=${res.data[0].id_groupe}`
                                                    })
                                            }
                                        })
                                })
                            }
                        })
                })
                .then(() => {
                    if (document.querySelector('#editProject')) {
                        document.querySelector('#editProject').addEventListener('click', function () {
                            fetch(`/api/user_data`)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    } else {
                                        document.querySelector('#projectUser').innerHTML = ""
                                        document.querySelector('#projectUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                                        throw new Error("Aucun membre trouvé")
                                    }
                                })
                                .then(res => {
                                    if (res.hasOwnProperty('user')) {
                                        document.querySelector('#userIdProject').value = res.user.id_membre
                                        document.querySelector('#projectUser').innerHTML = ""
                                        document.querySelector('#projectUser').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                                        console.log('connected')
                                    } else {
                                        document.querySelector('#projectUser').innerHTML = ""
                                        document.querySelector('#projectUser').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                                        document.querySelector('#sendEditProject').setAttribute('disabled', '')
                                        document.querySelector('#sendEditProject').style.color = 'grey'
                                    }
                                })
                                .catch((e) => {
                                    document.querySelector('#projectUser').innerHTML = ""
                                    document.querySelector('#projectUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun ticket trouvé</div></div>')
                                    return
                                })
                            if (document.querySelector('select#projectStatut')) {
                                fetch(`/api/statuts`)
                                    .then(response => {
                                        if (response.ok) {
                                            return response.json()
                                        }
                                    })
                                    .then(res => {
                                        if (res.data.length) {
                                            document.querySelector('select#projectStatut').innerHTML = ""
                                            res.data.forEach((item) => {
                                                document.querySelector('select#projectStatut').insertAdjacentHTML('beforeend', '<option value="' + item.id_statut + '">' + item.lib_statut + '</option>')
                                            })
                                        }
                                    })
                            }
                            fetch(`/api/project/${parseInt(getUrlParameter('idProject'))}`)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    }
                                })
                                .then(res => {
                                    if (res.data.length) {
                                        document.querySelector('#descProject').value = res.data[0].description
                                        document.querySelector('select#projectStatut').value = res.data[0].id_statut
                                        document.querySelector('select#projectType').value = res.data[0].type_projet
                                        document.querySelector('#dateDebut').value = new Date(res.data[0].date_debut).toISOString().substring(0, 10)
                                        document.querySelector('#dateFin').value = new Date(res.data[0].date_fin).toISOString().substring(0, 10)
                                        document.querySelector('#dossierReseau').value = res.data[0].dossier_reseau
                                        document.querySelector('#urlGitlab').value = res.data[0].url_gitlab
                                        document.querySelector('#urlPreprod').value = res.data[0].url_preprod
                                        document.querySelector('#urlProd').value = res.data[0].url_prod
                                    }
                                })
                                .catch((e) => {
                                    document.querySelector('#panel-edit-project .error-content').innerHTML = ""
                                    document.querySelector('#panel-edit-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                                    return
                                })
                        })
                    }
                })
                .catch(() => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#project-name')) {
        refreshProject('#project-name')
    }

    const refreshListProjectMembers = (target) => {
        if (document.querySelector(target)) {
            const idProject = getUrlParameter('idProject')
            fetch(`/api/members/project/${idProject}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Aucun membre trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        res.data.forEach((item) => {
                            document.querySelector(target).insertAdjacentHTML('beforeend',
                                `<div class="list-group-item" id=${item.id_membre}>
                                    ${item.prenom} ${item.nom} 
                                    <div class="my-3">
                                        <p class="mb-0"><small>Rôle : ${item.role_membre}</small></p>
                                        <p class="mb-0"><small>Nombre de jours sur ce projet : ${item.nb_jours}</small></p>
                                    </div>
                                    <small class="mr-3"><a href="/memberView?idMember=${item.id_membre}">Voir le membre</a></small>
                                </a>`)
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#listProjectMembers')) {
        refreshListProjectMembers('#listProjectMembers')
    }

    const refreshListProjectTasks = (target) => {
        if (document.querySelector(target)) {
            const idProject = getUrlParameter('idProject')
            if (document.querySelector('#listTicketsOpen')) {
                fetch(`/api/tickets/statut/1/project/${idProject}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Aucun ticket trouvé")
                        }
                    })
                    .then(res => {
                        if (res.data.length) {
                            document.querySelector('#listTicketsOpen').innerHTML = ''
                            res.data.forEach((item, i) => {
                                document.querySelector('#listTicketsOpen').insertAdjacentHTML('beforeend',
                                    `<a href="/ticketView?idTicket=${item.id_ticket}" class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_ticket}>
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                                <small>${item.date_ticket}</small>
                                            </div>
                                            <small>Projet associé : ${item.lib_projet}</small>
                                            <p class="my-4 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                            <small>${item.nb_commentaires} ${(item.nb_commentaires > 1) ? 'commentaires' : 'commentaire'}</small>
                                            <small><span class="badge badge-${item.lib_class} ml-2">${item.lib_urgence}</span></small>
                                        </a>`)
                            })
                        }
                    })
                    .catch((e) => {
                        document.querySelector('#listTicketsOpen').innerHTML = ''
                        document.querySelector('#listTicketsOpen').insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun ticket trouvé</small></div>')
                        return
                    })
            }
            if (document.querySelector('#listTicketsWip')) {
                const idProject = getUrlParameter('idProject')
                fetch(`/api/tickets/statut/2/project/${idProject}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Aucun ticket trouvé")
                        }
                    })
                    .then(res => {
                        if (res.data.length) {
                            document.querySelector('#listTicketsWip').innerHTML = ''
                            res.data.forEach((item, i) => {
                                document.querySelector('#listTicketsWip').insertAdjacentHTML('beforeend',
                                    `<a href="/ticketView?idTicket=${item.id_ticket}" class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_ticket}>
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                                <small>${item.date_ticket}</small>
                                            </div>
                                            <small>Projet associé : ${item.lib_projet}</small>
                                            <p class="my-4 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                            <small>${item.nb_commentaires} ${(item.nb_commentaires > 1) ? 'commentaires' : 'commentaire'}</small>
                                            <small><span class="badge badge-${item.lib_class} ml-2">${item.lib_urgence}</span></small>
                                        </a>`)
                            })
                        }
                    })
                    .catch((e) => {
                        document.querySelector('#listTicketsWip').innerHTML = ''
                        document.querySelector('#listTicketsWip').insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun ticket trouvé</small></div>')
                        return
                    })
            }
            if (document.querySelector('#listTicketsClosed')) {
                const idProject = getUrlParameter('idProject')
                fetch(`/api/tickets/statut/3/project/${idProject}`)
                    .then(response => {
                        if (response.ok) {
                            return response.json()
                        } else {
                            throw new Error("Aucun ticket trouvé")
                        }
                    })
                    .then(res => {
                        if (res.data.length) {
                            document.querySelector('#listTicketsClosed').innerHTML = ''
                            res.data.forEach((item, i) => {
                                document.querySelector('#listTicketsClosed').insertAdjacentHTML('beforeend',
                                    `<a href="/ticketView?idTicket=${item.id_ticket}" class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_ticket}>
                                            <div class="d-flex w-100 justify-content-between">
                                                <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                                <small>${item.date_ticket}</small>
                                            </div>
                                            <small>Projet associé : ${item.lib_projet}</small>
                                            <p class="my-4 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                            <small>${item.nb_commentaires} ${(item.nb_commentaires > 1) ? 'commentaires' : 'commentaire'}</small>
                                            <small><span class="badge badge-${item.lib_class} ml-2">${item.lib_urgence}</span></small>
                                        </a>`)
                            })
                        }
                    })
                    .catch(() => {
                        document.querySelector('#listTicketsClosed').innerHTML = ''
                        document.querySelector('#listTicketsClosed').insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun ticket trouvé</small></div>')
                        return
                    })
            }
        }
    }

    if (document.querySelector('#projectTasks')) {
        refreshListProjectTasks('#projectTasks')
    }

    const refreshTicketPanel = (target) => {
        if (document.querySelector(target)) {
            const idTicket = getUrlParameter('idTicket')
            fetch(`/api/ticket/${idTicket}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Aucun ticket trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).append('Ticket créé par : ' + res.data[0].prenom + ' ' + res.data[0].nom)
                        document.querySelector('#ticketPanel').innerHTML = ''
                        document.querySelector('#ticketPanel').insertAdjacentHTML('beforeend',
                            `<div class="list-group-item list-group-item-action flex-column align-items-start" id=${res.data[0].id_ticket}>
                            <div class="d-flex w-100 justify-content-between">
                                <h6 class="mb-1">${res.data[0].prenom} ${res.data[0].nom} <small>(<a href="/memberView?idMember=${res.data[0].id_membre}">voir</a>)</small></h6>
                                <small>${res.data[0].date_ticket}</small>
                            </div>
                            <small>Projet associé : ${res.data[0].lib_projet} (<a href="/projectView?idProject=${res.data[0].id_projet}">voir le projet</a>)</small>
                            <br/><small>Membres affectés : ${(res.data[0].membre_nom) ? res.data[0].membre_nom : ''}</small>
                            <br/><small><i class="far fa-envelope mr-2"></i><a href="#" id="sendMailNotification">Envoyer une notification aux membres</a></small>
                            <hr>
                            <small id="alertMail"></small>
                            <p class="my-4 text-place text-muted">${res.data[0].texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                            <small>${res.data[0].nb_commentaires} ${(res.data[0].nb_commentaires > 1) ? 'commentaires' : 'commentaire'}</small>
                            <small><span class="badge text-${res.data[0].statut_class} border border-${res.data[0].statut_class} ml-2">${res.data[0].lib_statut}</span></small>
                            <small><span class="badge badge-${res.data[0].lib_class} ml-2">${res.data[0].lib_urgence}</span></small>
                            <small><a href="#" id="editTicket" class="ml-3" ticket="${res.data[0].id_ticket}" data-toggle="modal" data-target="#panel-edit-ticket">Editer</a></small>
                            <small><a href="/allTickets" id="removeTicket" class="ml-3" ticket="${res.data[0].id_ticket}">Supprimer le ticket</a></small>
                        </div>`)
                    }
                })
                .then(() => {
                    if (document.querySelector('#removeTicket')) {
                        document.querySelector('#removeTicket').addEventListener('click', function () {
                            const idTicket = parseInt(document.querySelector('#removeTicket').getAttribute('ticket'))
                            const deleteMethod = {
                                method: 'DELETE',
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8'
                                }
                            }
                            fetch(`/api/ticket/${idTicket}`, deleteMethod)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    } else {
                                        throw new Error("Erreur lors de l'envoi des données")
                                    }
                                })
                                .then(res => {
                                    window.location.href = "/allTickets"
                                })
                                .catch((e) => {
                                    return
                                })
                        })
                    }
                    if (document.querySelector('#sendMailNotification')) {
                        document.querySelector('#sendMailNotification').addEventListener('click', function () {
                            const idTicket = parseInt(getUrlParameter('idTicket'))
                            let idMembers
                            let mailMemberList
                            let text
                            fetch(`/api/ticket/${idTicket}`)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    }
                                })
                                .then(res => {
                                    if (res.data.length) {
                                        idMembers = res.data[0].id_membre_affecte
                                        text = res.data[0].texte
                                        mailMemberList = res.data[0].membre_mail
                                    }
                                })
                                .then(() => {
                                    const dataMail = {
                                        mailMember: mailMemberList,
                                        idTicket: parseInt(getUrlParameter('idTicket')),
                                        text: text
                                    }
                                    const postMailMethod = {
                                        method: 'POST',
                                        headers: {
                                            'Content-type': 'application/json; charset=UTF-8'
                                        },
                                        body: JSON.stringify(dataMail)
                                    }
                                    fetch(`/api/email`, postMailMethod)
                                        .then(response => {
                                            if (response.ok) {
                                                return response.text()
                                            }
                                        })
                                        .then(() => {
                                            if (document.querySelector('#alertMail')) {
                                                document.querySelector('#alertMail').innerHTML = ''
                                                document.querySelector('#alertMail').insertAdjacentHTML('beforeend', '<span class="badge badge-success">Mail envoyé</span>')
                                            }
                                        })
                                        .catch(() => {
                                            if (document.querySelector('#alertMail')) {
                                                document.querySelector('#alertMail').innerHTML = ''
                                                document.querySelector('#alertMail').insertAdjacentHTML('beforeend', '<span class="badge badge-danger">Erreur à l\'envoi</span>')
                                            }
                                        })
                                })
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Ce ticket n\'existe pas</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#ticket-name')) {
        refreshTicketPanel('#ticket-name')
    }

    const refreshListComments = (target) => {
        if (document.querySelector(target)) {
            const idTicket = getUrlParameter('idTicket')
            fetch(`/api/comments/ticket/${idTicket}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Aucun ticket trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        res.data.forEach((item, i) => {
                            document.querySelector(target).insertAdjacentHTML('beforeend',
                                `<div class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_commentaire}>
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                        <small>${item.date_commentaire}</small>
                                    </div>
                                    <p class="my-3 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                </div>`)
                        })
                    }
                })
                .catch(() => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start">Aucun commentaire</div>')
                    return
                })
        }
    }

    if (document.querySelector('#listComments')) {
        refreshListComments('#listComments')
    }

    const refreshAllTickets = (target, apiOpts) => {
        if (document.querySelector(target)) {
            fetch(apiOpts.url)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun ticket trouvé</div></div>')
                        throw new Error("Aucun ticket trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        res.data.forEach((item, i) => {
                            document.querySelector(target).insertAdjacentHTML('beforeend',
                                `<a href="/ticketView?idTicket=${item.id_ticket}" class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_ticket}>
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                        <small>${item.date_ticket}</small>
                                    </div>
                                    <small>Projet associé : ${item.lib_projet}</small>
                                    <br/><small>Membres affectés : ${(item.membre_nom) ? item.membre_nom : ''}</small>
                                    <p class="my-4 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                    <small>${item.nb_commentaires} ${(item.nb_commentaires > 1) ? 'commentaires' : 'commentaire'}</small>
                                    <small><span class="badge text-${res.data[0].statut_class} border border-${res.data[0].statut_class} ml-2">${item.lib_statut}</span></small>
                                    <small><span class="badge badge-${item.lib_class} ml-2">${item.lib_urgence}</span></small>
                                </a>`)
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun ticket trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#listAllTickets')) {
        refreshAllTickets('#listAllTickets', { url: '/api/tickets' })
    }

    if (document.querySelector('#listTicketsMember')) {
        const idMember = getUrlParameter('idMember')
        refreshAllTickets('#listTicketsMember', { url: `/api/tickets/member/${idMember}` })
    }

    if (document.querySelector('#addTicket')) {
        document.querySelector('#addTicket').addEventListener('click', function () {
            fetch(`/api/user_data`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#ticketUser').innerHTML = ""
                        document.querySelector('#ticketUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                        throw new Error("Aucun membre trouvé")
                    }
                })
                .then(res => {
                    if (res.hasOwnProperty('user')) {
                        document.querySelector('#userId').value = res.user.id_membre
                        document.querySelector('#ticketUser').innerHTML = ""
                        document.querySelector('#ticketUser').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                    } else {
                        document.querySelector('#ticketUser').innerHTML = ""
                        document.querySelector('#ticketUser').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                        document.querySelector('#sendTicket').setAttribute('disabled', '')
                        document.querySelector('#sendTicket').style.color = 'grey'
                    }
                    document.querySelector('#ticketTextArea').value = ""
                    document.querySelector('#dateArea').innerHTML = ""
                    document.querySelector('#dateArea').append(new Date().toLocaleString())
                    document.querySelector('#dateVal').value = new Date().toLocaleString()
                    if (document.querySelector('select#projectChoice')) {
                        fetch(`/api/projects`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                }
                            })
                            .then(res => {
                                if (res.data.length) {
                                    document.querySelector('select#projectChoice').innerHTML = ""
                                    res.data.forEach((item) => {
                                        document.querySelector('select#projectChoice').insertAdjacentHTML('beforeend', '<option value="' + item.id_projet + '">' + item.lib_projet + '</option>')
                                    })
                                }
                            })
                    }
                    if (document.querySelector('select#statutChoice')) {
                        fetch(`/api/statuts`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                }
                            })
                            .then(res => {
                                if (res.data.length) {
                                    document.querySelector('select#statutChoice').innerHTML = ""
                                    res.data.forEach((item) => {
                                        document.querySelector('select#statutChoice').insertAdjacentHTML('beforeend', '<option value="' + item.id_statut + '">' + item.lib_statut + '</option>')
                                    })
                                }
                            })
                    }
                    if (document.querySelector('select#urgenceChoice')) {
                        fetch(`/api/urgence`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                }
                            })
                            .then(res => {
                                if (res.data.length) {
                                    document.querySelector('select#urgenceChoice').innerHTML = ""
                                    res.data.forEach((item) => {
                                        document.querySelector('select#urgenceChoice').insertAdjacentHTML('beforeend', '<option value="' + item.id_urgence + '">' + item.lib_urgence + '</option>')
                                    })
                                }
                            })
                    }
                    if (document.querySelector('select#membersAffectedChoice')) {
                        fetch(`/api/members`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                }
                            })
                            .then(res => {
                                if (res.data.length) {
                                    document.querySelector('select#membersAffectedChoice').innerHTML = ""
                                    res.data.forEach((item) => {
                                        document.querySelector('select#membersAffectedChoice').insertAdjacentHTML('beforeend', '<option value="' + item.id_membre + '">' + item.prenom + ' ' + item.nom + '</option>')
                                    })
                                }
                            })
                    }
                })
                .catch((e) => {
                    document.querySelector('#ticketUser').innerHTML = ""
                    document.querySelector('#ticketUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun ticket trouvé</div></div>')
                    return
                })
        })
    }

    if (document.querySelector('#sendTicket')) {
        document.querySelector('#sendTicket').addEventListener('click', function () {
            const data = {
                idMember: parseInt(document.querySelector('#userId').value),
                idProject: parseInt(document.querySelector('select#projectChoice').value),
                idStatut: parseInt(document.querySelector('select#statutChoice').value),
                idUrgence: parseInt(document.querySelector('select#urgenceChoice').value),
                dateTicket: new Date(),
                idMembersAffected: [...document.querySelector('select#membersAffectedChoice').options].filter(option => option.selected).map(option => parseInt(option.value)),
                text: document.querySelector('#ticketTextArea').value
            }
            const putMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/tickets`, putMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-add-ticket .error-content').innerHTML = ""
                        document.querySelector('#panel-add-ticket .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur lors de l'envoi des données")
                    }
                })
                .then(res => {
                    $('#panel-add-ticket').modal('toggle')
                    if (document.querySelector('#listTickets')) {
                        refreshListTickets('#listTickets')
                    }
                    if (document.querySelector('#listAllTickets')) {
                        refreshAllTickets('#listAllTickets', { url: '/api/tickets' })
                    }
                    if (document.querySelector('#listTicketsMember')) {
                        const idMember = getUrlParameter('idMember')
                        refreshAllTickets('#listTicketsMember', { url: `/api/tickets/member/${idMember}` })
                    }
                    if (document.querySelector('#projectTasks')) {
                        refreshListProjectTasks('#projectTasks')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-add-ticket .error-content').innerHTML = ""
                    document.querySelector('#panel-add-ticket .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    if (document.querySelector('#addComment')) {
        document.querySelector('#addComment').addEventListener('click', function () {
            fetch(`/api/user_data`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#commentUser').innerHTML = ""
                        document.querySelector('#commentUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                        throw new Error("Aucun membre trouvé")
                    }
                })
                .then(res => {
                    if (res.hasOwnProperty('user')) {
                        document.querySelector('#userIdComment').value = res.user.id_membre
                        document.querySelector('#commentUser').innerHTML = ""
                        document.querySelector('#commentUser').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                    } else {
                        document.querySelector('#commentUser').innerHTML = ""
                        document.querySelector('#commentUser').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                        document.querySelector('#sendComment').setAttribute('disabled', '')
                        document.querySelector('#sendComment').style.color = 'grey'
                    }
                    document.querySelector('#commentTextArea').value = ""
                    document.querySelector('#dateAreaComment').innerHTML = ""
                    document.querySelector('#dateAreaComment').append(new Date().toLocaleString())
                    document.querySelector('#dateValComment').value = new Date().toLocaleString()
                })
                .catch((e) => {
                    document.querySelector('#commentUser').innerHTML = ""
                    document.querySelector('#commentUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    return
                })
        })
    }

    if (document.querySelector('#sendComment')) {
        document.querySelector('#sendComment').addEventListener('click', function () {
            const data = {
                idMember: parseInt(document.querySelector('#userIdComment').value),
                idTicket: getUrlParameter('idTicket'),
                dateTicket: new Date(),
                text: document.querySelector('#commentTextArea').value
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/comments`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-add-comment .error-content').innerHTML = ""
                        document.querySelector('#panel-add-comment .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur lors de l'envoi des données")
                    }
                })
                .then(res => {
                    $('#panel-add-comment').modal('toggle')
                    if (document.querySelector('#listComments')) {
                        refreshListComments('#listComments')
                    }
                    if (document.querySelector('#ticket-name')) {
                        refreshTicketPanel('#ticket-name')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-add-comment .error-content').innerHTML = ""
                    document.querySelector('#panel-add-comment .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    if (document.querySelector('#sendEditProject')) {
        document.querySelector('#sendEditProject').addEventListener('click', function () {
            const data = {
                idProject: parseInt(getUrlParameter('idProject')),
                descProject: document.querySelector('#descProject').value,
                type: document.querySelector('select#projectType').value,
                dateDebut: document.querySelector('#dateDebut').value,
                dateFin: document.querySelector('#dateFin').value,
                dossierReseau: document.querySelector('#dossierReseau').value,
                urlGitlab: document.querySelector('#urlGitlab').value,
                urlPreprod: document.querySelector('#urlPreprod').value,
                urlProd: document.querySelector('#urlProd').value,
                idStatut: document.querySelector('select#projectStatut').value
            }
            const putMethod = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/project`, putMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-edit-project .error-content').innerHTML = ""
                        document.querySelector('#panel-edit-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur lors de la mise à jour")
                    }
                })
                .then(res => {
                    $('#panel-edit-project').modal('toggle')
                    if (document.querySelector('#project-name')) {
                        refreshProject('#project-name')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-edit-project .error-content').innerHTML = ""
                    document.querySelector('#panel-edit-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    if (document.querySelector('#sendEditProjectMember')) {
        document.querySelector('#sendEditProjectMember').addEventListener('click', function () {
            const data = {
                idMember: parseInt(getUrlParameter('idMember')),
                idProject: parseInt(document.querySelector('#idProject').value),
                roleMembre: document.querySelector('#roleMember').value,
                nbJours: document.querySelector('#nbJours').value,
            }
            const putMethod = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/membersProject`, putMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-edit-project-member .error-content').innerHTML = ""
                        document.querySelector('#panel-edit-project-member .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur lors de la mise à jour")
                    }
                })
                .then(res => {
                    $('#panel-edit-project-member').modal('toggle')
                    if (document.querySelector('#listMemberProjectsOpen')) {
                        refreshProjectMember('#listMemberProjectsOpen', 'Projet', 1)
                    }
                    if (document.querySelector('#listMemberProjectsWip')) {
                        refreshProjectMember('#listMemberProjectsWip', 'Projet', 2)
                    }
                    if (document.querySelector('#listMemberProjectsClosed')) {
                        refreshProjectMember('#listMemberProjectsClosed', 'Projet', 3)
                    }
                    if (document.querySelector('#member-name')) {
                        refreshMemberInfo('#member-name')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-edit-project-member .error-content').innerHTML = ""
                    document.querySelector('#panel-edit-project-member .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    $('#panel-affect-member-project').on('show.bs.modal', function (e) {
        document.querySelector('select#projectAffect').value = ''
        document.querySelector('#roleMemberToAffect').value = ''
        document.querySelector('#nbJoursToAffect').value = ''
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userName').innerHTML = ""
                    document.querySelector('#userName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userId').value = res.user.id_membre
                    document.querySelector('#userName').innerHTML = ""
                    document.querySelector('#userName').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#userName').innerHTML = ""
                    document.querySelector('#userName').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#affectMemberToProject').setAttribute('disabled', '')
                    document.querySelector('#affectMemberToProject').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('#memberName')) {
                    const idMember = getUrlParameter('idMember')
                    fetch(`/api/member/${idMember}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                document.querySelector('#memberName').innerHTML = ''
                                document.querySelector('#memberName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                                throw new Error("Aucun membre trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#memberName').innerHTML = ''
                                document.querySelector('#memberName').append('Membre : ' + res.data[0].prenom + ' ' + res.data[0].nom)
                            }
                        })
                        .catch(() => {
                            document.querySelector('#memberName').innerHTML = ''
                            document.querySelector('#memberName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                            return
                        })
                }
                if (document.querySelector('select#projectAffect')) {
                    fetch(`/api/projects`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#projectAffect').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#projectAffect').insertAdjacentHTML('beforeend', '<option value="' + item.id_projet + '">' + item.lib_projet + '</option>')
                                })
                            }
                        })
                }
            })
            .catch((e) => {
                document.querySelector('#userName').innerHTML = ""
                document.querySelector('#userName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#affectMemberToProject')) {
        document.querySelector('#affectMemberToProject').addEventListener('click', function () {
            const data = {
                idMember: parseInt(getUrlParameter('idMember')),
                idProject: parseInt(document.querySelector('select#projectAffect').value),
                roleMembre: document.querySelector('#roleMemberToAffect').value,
                nbJours: document.querySelector('#nbJoursToAffect').value,
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/membersProject`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-affect-member-project .error-content').innerHTML = ""
                        document.querySelector('#panel-affect-member-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Membre déjà affecté à ce projet</div></div>')
                        throw new Error("Membre déjà affecté à ce projet")
                    }
                })
                .then(res => {
                    $('#panel-affect-member-project').modal('toggle')
                    if (document.querySelector('#listMemberProjectsOpen')) {
                        refreshProjectMember('#listMemberProjectsOpen', 'Projet', 1)
                    }
                    if (document.querySelector('#listMemberProjectsWip')) {
                        refreshProjectMember('#listMemberProjectsWip', 'Projet', 2)
                    }
                    if (document.querySelector('#listMemberProjectsClosed')) {
                        refreshProjectMember('#listMemberProjectsClosed', 'Projet', 3)
                    }
                    if (document.querySelector('#member-name')) {
                        refreshMemberInfo('#member-name')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-affect-member-project .error-content').innerHTML = ""
                    document.querySelector('#panel-affect-member-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    $('#panel-remove-member-project').on('show.bs.modal', function (e) {
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userNameRmv').innerHTML = ""
                    document.querySelector('#userNameRmv').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdRmv').value = res.user.id_membre
                    document.querySelector('#userNameRmv').innerHTML = ""
                    document.querySelector('#userNameRmv').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#userNameRmv').innerHTML = ""
                    document.querySelector('#userNameRmv').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#removeMemberToProject').setAttribute('disabled', '')
                    document.querySelector('#removeMemberToProject').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('#memberNameRmv')) {
                    const idMember = getUrlParameter('idMember')
                    fetch(`/api/member/${idMember}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                document.querySelector('#memberNameRmv').innerHTML = ''
                                document.querySelector('#memberNameRmv').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                                throw new Error("Aucun membre trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#memberNameRmv').innerHTML = ''
                                document.querySelector('#memberNameRmv').append('Membre : ' + res.data[0].prenom + ' ' + res.data[0].nom)
                            }
                        })
                        .catch(() => {
                            document.querySelector('#memberNameRmv').innerHTML = ''
                            document.querySelector('#memberNameRmv').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                            return
                        })
                }
                if (document.querySelector('select#projectRemove')) {
                    const idMember = getUrlParameter('idMember')
                    fetch(`/api/projects/member/${idMember}?type=Projet&idStatut=1&idStatut=2&idStatut=3`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#projectRemove').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#projectRemove').insertAdjacentHTML('beforeend', '<option value="' + item.id_projet + '">' + item.lib_projet + '</option>')
                                })
                            }
                        })
                }
            })
            .catch((e) => {
                document.querySelector('#userNameRmv').innerHTML = ""
                document.querySelector('#userNameRmv').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#removeMemberToProject')) {
        document.querySelector('#removeMemberToProject').addEventListener('click', function () {
            const data = {
                idMember: parseInt(getUrlParameter('idMember')),
                idProject: parseInt(document.querySelector('select#projectRemove').value)
            }
            const deleteMethod = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/membersProject`, deleteMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-remove-member-project .error-content').innerHTML = ""
                        document.querySelector('#panel-remove-member-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    $('#panel-remove-member-project').modal('toggle')
                    if (document.querySelector('#listMemberProjectsOpen')) {
                        refreshProjectMember('#listMemberProjectsOpen', 'Projet', 1)
                    }
                    if (document.querySelector('#listMemberProjectsWip')) {
                        refreshProjectMember('#listMemberProjectsWip', 'Projet', 2)
                    }
                    if (document.querySelector('#listMemberProjectsClosed')) {
                        refreshProjectMember('#listMemberProjectsClosed', 'Projet', 3)
                    }
                    if (document.querySelector('#member-name')) {
                        refreshMemberInfo('#member-name')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-remove-member-project .error-content').innerHTML = ""
                    document.querySelector('#panel-remove-member-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    $('#panel-edit-ticket').on('show.bs.modal', function (e) {
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#ticketUserEdit').innerHTML = ""
                    document.querySelector('#ticketUserEdit').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdEdit').value = res.user.id_membre
                    document.querySelector('#ticketUserEdit').innerHTML = ""
                    document.querySelector('#ticketUserEdit').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#ticketUserEdit').innerHTML = ""
                    document.querySelector('#ticketUserEdit').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#sendEditTicket').setAttribute('disabled', '')
                    document.querySelector('#sendEditTicket').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('select#statutChoiceEdit')) {
                    fetch(`/api/statuts`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#statutChoiceEdit').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#statutChoiceEdit').insertAdjacentHTML('beforeend', '<option value="' + item.id_statut + '">' + item.lib_statut + '</option>')
                                })
                            }
                        })
                }
                if (document.querySelector('select#urgenceChoiceEdit')) {
                    fetch(`/api/urgence`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#urgenceChoiceEdit').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#urgenceChoiceEdit').insertAdjacentHTML('beforeend', '<option value="' + item.id_urgence + '">' + item.lib_urgence + '</option>')
                                })
                            }
                        })
                }
            }).then(() => {
                fetch(`/api/ticket/${parseInt(getUrlParameter('idTicket'))}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                if (document.querySelector('select#statutChoiceEdit').length) {
                                    document.querySelector('select#statutChoiceEdit').value = res.data[0].id_statut
                                }
                                if (document.querySelector('select#urgenceChoiceEdit').length) {
                                    document.querySelector('select#urgenceChoiceEdit').value = res.data[0].id_urgence
                                }
                                if (document.querySelector('#textTicketEdit')) {
                                    document.querySelector('#textTicketEdit').value = res.data[0].texte
                                } 
                            }
                        })
            })
            .catch((e) => {
                document.querySelector('#userNameRmv').innerHTML = ""
                document.querySelector('#userNameRmv').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#sendEditTicket')) {
        document.querySelector('#sendEditTicket').addEventListener('click', function () {
            const data = {
                idTicket: parseInt(getUrlParameter('idTicket')),
                idStatut: parseInt(document.querySelector('select#statutChoiceEdit').value),
                idUrgence: parseInt(document.querySelector('select#urgenceChoiceEdit').value),
                texte: document.querySelector('#textTicketEdit').value
            }
            const putMethod = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/tickets`, putMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-edit-ticket .error-content').innerHTML = ""
                        document.querySelector('#panel-edit-ticket .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    $('#panel-edit-ticket').modal('toggle')
                    if (document.querySelector('#ticket-name')) {
                        refreshTicketPanel('#ticket-name')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-edit-ticket .error-content').innerHTML = ""
                    document.querySelector('#panel-edit-ticket .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    $('#panel-affect-project-member').on('show.bs.modal', function (e) {
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userNameAddProj').innerHTML = ""
                    document.querySelector('#userNameAddProj').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdAddProj').value = res.user.id_membre
                    document.querySelector('#userNameAddProj').innerHTML = ""
                    document.querySelector('#userNameAddProj').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#userNameAddProj').innerHTML = ""
                    document.querySelector('#userNameAddProj').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#addMemberToProject').setAttribute('disabled', '')
                    document.querySelector('#addMemberToProject').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('#projectNameAffect')) {
                    const idProject = getUrlParameter('idProject')
                    fetch(`/api/project/${idProject}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                document.querySelector('#projectNameAffect').innerHTML = ''
                                document.querySelector('#projectNameAffect').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                                throw new Error("Aucun projet trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#projectNameAffect').innerHTML = ''
                                document.querySelector('#projectNameAffect').insertAdjacentHTML('beforeend', `Projet : ${res.data[0].lib_projet}`)
                            }
                        })
                        .catch(() => {
                            document.querySelector('#projectNameAffect').innerHTML = ''
                            document.querySelector('#projectNameAffect').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                            return
                        })
                }
                if (document.querySelector('select#membersAffect')) {
                    fetch(`/api/members`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#membersAffect').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#membersAffect').insertAdjacentHTML('beforeend', '<option value="' + item.id_membre + '">' + item.prenom + ' ' + item.nom + '</option>')
                                })
                            }
                        })
                }
            })
            .catch((e) => {
                document.querySelector('#userNameAddProj').innerHTML = ""
                document.querySelector('#userNameAddProj').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#addMemberToProject')) {
        document.querySelector('#addMemberToProject').addEventListener('click', function () {
            const data = {
                idMember: parseInt(document.querySelector('select#membersAffect').value),
                idProject: parseInt(getUrlParameter('idProject')),
                roleMembre: document.querySelector('#roleMemberToProject').value,
                nbJours: document.querySelector('#nbJoursToProject').value,
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/membersProject`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-affect-project-member .error-content').innerHTML = ""
                        document.querySelector('#panel-affect-project-member .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Membre déjà affecté à ce projet</div></div>')
                        throw new Error("Membre déjà affecté à ce projet")
                    }
                })
                .then(res => {
                    $('#panel-affect-project-member').modal('toggle')
                    if (document.querySelector('#listProjectMembers')) {
                        refreshListProjectMembers('#listProjectMembers')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-affect-project-member .error-content').innerHTML = ""
                    document.querySelector('#panel-affect-project-member .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    $('#panel-delete-project-member').on('show.bs.modal', function (e) {
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userNameDeleteProj').innerHTML = ""
                    document.querySelector('#userNameDeleteProj').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdDeleteProj').value = res.user.id_membre
                    document.querySelector('#userNameDeleteProj').innerHTML = ""
                    document.querySelector('#userNameDeleteProj').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#userNameDeleteProj').innerHTML = ""
                    document.querySelector('#userNameDeleteProj').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#applyDeleteMemberToProject').setAttribute('disabled', '')
                    document.querySelector('#applyDeleteMemberToProject').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('#projectNameDelete')) {
                    const idProject = getUrlParameter('idProject')
                    fetch(`/api/project/${idProject}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                document.querySelector('#projectNameDelete').innerHTML = ''
                                document.querySelector('#projectNameDelete').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                                throw new Error("Aucun projet trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#projectNameDelete').innerHTML = ''
                                document.querySelector('#projectNameDelete').insertAdjacentHTML('beforeend', `Projet : ${res.data[0].lib_projet}`)
                            }
                        })
                        .catch(() => {
                            document.querySelector('#projectNameDelete').innerHTML = ''
                            document.querySelector('#projectNameDelete').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                            return
                        })
                }
                if (document.querySelector('select#membersDelete')) {
                    const idProject = getUrlParameter('idProject')
                    fetch(`/api/members/project/${idProject}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#membersDelete').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#membersDelete').insertAdjacentHTML('beforeend', '<option value="' + item.id_membre + '">' + item.prenom + ' ' + item.nom + '</option>')
                                })
                            }
                        })
                }
            })
            .catch((e) => {
                document.querySelector('#userNameDeleteProj').innerHTML = ""
                document.querySelector('#userNameDeleteroj').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#applyDeleteMemberToProject')) {
        document.querySelector('#applyDeleteMemberToProject').addEventListener('click', function () {
            const data = {
                idMember: parseInt(document.querySelector('select#membersDelete').value),
                idProject: parseInt(getUrlParameter('idProject'))
            }
            const deleteMethod = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/membersProject`, deleteMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-delete-project-member .error-content').innerHTML = ""
                        document.querySelector('#panel-delete-project-member .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    $('#panel-delete-project-member').modal('toggle')
                    if (document.querySelector('#listProjectMembers')) {
                        refreshListProjectMembers('#listProjectMembers')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-delete-project-member .error-content').innerHTML = ""
                    document.querySelector('#panel-delete-project-member .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    $('#panel-add-project').on('show.bs.modal', function (e) {
        document.querySelector('#addProjectName').value = ''
        document.querySelector('#addProjectDesc').value = ''
        document.querySelector('#addProjectType').value = ''
        document.querySelector('#addProjectDateDebut').value = ''
        document.querySelector('#addProjectDateFin').value = ''
        document.querySelector('#addProjectDossierReseau').value = ''
        document.querySelector('#addProjectUrlGitlab').value = ''
        document.querySelector('#addProjectUrlPreprod').value = ''
        document.querySelector('#addProjectUrlProd').value = ''
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userNameCreateProj').innerHTML = ""
                    document.querySelector('#userNameCreateProj').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdCreateProj').value = res.user.id_membre
                    document.querySelector('#userNameCreateProj').innerHTML = ""
                    document.querySelector('#userNameCreateProj').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    console.log('hey')
                    document.querySelector('#userNameCreateProj').innerHTML = ""
                    document.querySelector('#userNameCreateProj').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#sendAddProject').setAttribute('disabled', '')
                    document.querySelector('#sendAddProject').style.color = 'grey'
                }
            })
            .catch((e) => {
                document.querySelector('#userNameCreateProj').innerHTML = ""
                document.querySelector('#userNameCreateProj').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
        if (document.querySelector('select#addProjectStatut')) {
            fetch(`/api/statuts`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector('select#addProjectStatut').innerHTML = ""
                        res.data.forEach((item) => {
                            document.querySelector('select#addProjectStatut').insertAdjacentHTML('beforeend', '<option value="' + item.id_statut + '">' + item.lib_statut + '</option>')
                        })
                    }
                })
        }
    })

    if (document.querySelector('#sendAddProject')) {
        document.querySelector('#sendAddProject').addEventListener('click', function () {
            const data = {
                idGroup: parseInt(getUrlParameter('idGroup')),
                libProject: document.querySelector('#addProjectName').value,
                idStatut: document.querySelector('#addProjectStatut').value,
                descProject: document.querySelector('#addProjectDesc').value,
                type: document.querySelector('#addProjectType').value,
                dateDebut: document.querySelector('#addProjectDateDebut').value,
                dateFin: document.querySelector('#addProjectDateFin').value,
                dossierReseau: document.querySelector('#addProjectDossierReseau').value,
                urlGitlab: document.querySelector('#addProjectUrlGitlab').value,
                urlPreprod: document.querySelector('#addProjectUrlPreprod').value,
                urlProd: document.querySelector('#addProjectUrlProd').value
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/project`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-add-project .error-content').innerHTML = ""
                        document.querySelector('#panel-add-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    $('#panel-add-project').modal('toggle')
                    if (document.querySelector('#byProject')) {
                        refreshListByProject('#byProject')
                    }
                    if (document.querySelector('#byBackend')) {
                        refreshListByRoutine('#byBackend')
                    }
                    if (document.querySelector('#projectByStatut')) {
                        refreshListProjectStatut('#projectByStatut')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-add-project .error-content').innerHTML = ""
                    document.querySelector('#panel-add-project .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    const refreshListCategories = (target) => {
        if (document.querySelector(target)) {
            fetch(`/api/categories`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(tagret).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucune catégorie trouvée</div></div>')
                        throw new Error("Aucune catégorie trouvée")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ""
                        res.data.forEach((item, i) => {
                            document.querySelector(target).insertAdjacentHTML('beforeend',
                                `<a href="/categoryView?idCategory=${item.id_cat}" class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_cat}>
                                        <div class="d-flex w-100 justify-content-between">
                                            <h6 class="mb-1">${item.lib_categorie}</h6>
                                        </div>
                                        <small>${(item.nb_outils) ? item.nb_outils : 0} ${(item.nb_outils > 1) ? 'outil' : 'outil'}</small>
                                    </a>`)
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucune catégorie trouvée</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#listCategories')) {
        refreshListCategories('#listCategories')
    }

    $('#panel-add-category').on('show.bs.modal', function (e) {
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userNameAddCategory').innerHTML = ""
                    document.querySelector('#userNameAddCategory').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdAddCategory').value = res.user.id_membre
                    document.querySelector('#userNameAddCategory').innerHTML = ""
                    document.querySelector('#userNameAddCategory').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    console.log('hey')
                    document.querySelector('#userNameAddCategory').innerHTML = ""
                    document.querySelector('#userNameAddCategory').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#sendAddCategory').setAttribute('disabled', '')
                    document.querySelector('#sendAddCategory').style.color = 'grey'
                }
            })
            .catch((e) => {
                document.querySelector('#userNameAddCategory').innerHTML = ""
                document.querySelector('#userNameAddCategory').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#sendAddCategory')) {
        document.querySelector('#sendAddCategory').addEventListener('click', function () {
            const data = {
                categoryName: document.querySelector('#addCategoryName').value,
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/category`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-add-category .error-content').innerHTML = ""
                        document.querySelector('#panel-add-category .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    $('#panel-add-category').modal('toggle')
                    if (document.querySelector('#listCategories')) {
                        refreshListCategories('#listCategories')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-add-category .error-content').innerHTML = ""
                    document.querySelector('#panel-add-category .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    const refreshCategoryView = (target) => {
        if (document.querySelector(target)) {
            fetch(`/api/category/${parseInt(getUrlParameter('idCategory'))}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(target).innerHTML = ""
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ""
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<i class="fas fa-robot mr-2"></i>' + res.data[0].lib_categorie)
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ""
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#categoryName')) {
        refreshCategoryView('#categoryName')
    }

    const refreshToolsByCategoryView = (target) => {
        if (document.querySelector(target)) {
            fetch(`/api/tools/category/${parseInt(getUrlParameter('idCategory'))}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector(target).innerHTML = ""
                        document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun outil trouvé</small></div>')
                        throw new Error("Aucun outil trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ""
                        res.data.forEach((item, i) => {
                            document.querySelector(target).insertAdjacentHTML('beforeend',
                                `<div class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_outil}>
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1"><a href="/toolView?idTool=${item.id_outil}">${item.lib_outil}</a></h6>
                                        <small>Catégorie : ${item.lib_categorie}</small>
                                    </div>
                                    <p class="my-4 text-place text-muted">${item.desc_outil.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                    <small><a href="${item.url}" target="_blank">Lien</a></small>
                                    </div>`)
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ""
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun outil trouvé</small></div>')
                    return
                })
        }
    }

    if (document.querySelector('#listToolsByCategory')) {
        refreshToolsByCategoryView('#listToolsByCategory')
    }

    $('#panel-add-tool').on('show.bs.modal', function (e) {
        document.querySelector('#addToolName').value = ''
        document.querySelector('#addToolDesc').value = ''
        document.querySelector('#addToolUrl').value = ''
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#userNameAddTool').innerHTML = ""
                    document.querySelector('#userNameAddTool').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    throw new Error("Aucun membre trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#userIdAddTool').value = res.user.id_membre
                    document.querySelector('#userNameAddTool').innerHTML = ""
                    document.querySelector('#userNameAddTool').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    console.log('hey')
                    document.querySelector('#userNameAddTool').innerHTML = ""
                    document.querySelector('#userNameAddTool').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#sendAddTool').setAttribute('disabled', '')
                    document.querySelector('#sendAddTool').style.color = 'grey'
                }
            })
            .catch((e) => {
                document.querySelector('#userNameAddTool').innerHTML = ""
                document.querySelector('#userNameAddTool').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#sendAddTool')) {
        document.querySelector('#sendAddTool').addEventListener('click', function () {
            const data = {
                idCategory: parseInt(getUrlParameter('idCategory')),
                nameTool: document.querySelector('#addToolName').value,
                descTool: document.querySelector('#addToolDesc').value,
                urlTool: document.querySelector('#addToolUrl').value,
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/tool`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-add-tool .error-content').innerHTML = ""
                        document.querySelector('#panel-add-tool .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur")
                    }
                })
                .then(res => {
                    $('#panel-add-tool').modal('toggle')
                    if (document.querySelector('#listToolsByCategory')) {
                        refreshToolsByCategoryView('#listToolsByCategory')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-add-tool .error-content').innerHTML = ""
                    document.querySelector('#panel-add-tool .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    const refreshToolView = (target) => {
        if (document.querySelector(target)) {
            const idTool = getUrlParameter('idTool')
            fetch(`/api/tool/${idTool}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Aucun outil trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        document.querySelector(target).append('Outil : ' + res.data[0].lib_outil + ' (catégorie : ' + res.data[0].lib_categorie + ')')
                        document.querySelector('#toolPanel').innerHTML = ''
                        document.querySelector('#toolPanel').insertAdjacentHTML('beforeend',
                            `<div class="list-group-item list-group-item-action flex-column align-items-start" id=${res.data[0].id_outil}>
                                <div class="d-flex w-100 justify-content-between">
                                    <h6 class="mb-1"><a href="/toolView?idTool=${res.data[0].id_outil}">${res.data[0].lib_outil}</a></h6>
                                    <small>Catégorie : ${res.data[0].lib_categorie}</small>
                                </div>
                                <p class="my-4 text-place text-muted">${res.data[0].desc_outil.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                <small><a href="${res.data[0].url}" target="_blank">Lien</a></small>
                                <small><a href="javascript:history.back()" id="removeTool" class="ml-3" tool="${res.data[0].id_outil}">Supprimer</a></small>
                            </div>`)
                    }
                })
                .then(() => {
                    if (document.querySelector('#removeTool')) {
                        document.querySelector('#removeTool').addEventListener('click', function () {
                            const idTool = parseInt(document.querySelector('#removeTool').getAttribute('tool'))
                            const deleteMethod = {
                                method: 'DELETE',
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8'
                                }
                            }
                            fetch(`/api/tool/${idTool}`, deleteMethod)
                                .then(response => {
                                    if (response.ok) {
                                        return response.json()
                                    } else {
                                        throw new Error("Erreur lors de l'envoi des données")
                                    }
                                })
                                .then(() => {
                                })
                                .catch((e) => {
                                    return
                                })
                        })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Ce ticket n\'existe pas</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#tool-name')) {
        refreshToolView('#tool-name')
    }

    if (document.querySelector('#addCommentTool')) {
        document.querySelector('#addCommentTool').addEventListener('click', function () {
            fetch(`/api/user_data`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#commentUserTool').innerHTML = ""
                        document.querySelector('#commentUserTool').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                        throw new Error("Aucun membre trouvé")
                    }
                })
                .then(res => {
                    if (res.hasOwnProperty('user')) {
                        document.querySelector('#userIdCommentTool').value = res.user.id_membre
                        document.querySelector('#commentUserTool').innerHTML = ""
                        document.querySelector('#commentUserTool').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                    } else {
                        document.querySelector('#commentUserTool').innerHTML = ""
                        document.querySelector('#commentUserTool').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                        document.querySelector('#sendCommentTool').setAttribute('disabled', '')
                        document.querySelector('#sendCommentTool').style.color = 'grey'
                    }
                    document.querySelector('#commentTextAreaTool').value = ""
                    document.querySelector('#dateAreaCommentTool').innerHTML = ""
                    document.querySelector('#dateAreaCommentTool').append(new Date().toLocaleString())
                    document.querySelector('#dateValCommentTool').value = new Date().toLocaleString()
                })
                .catch((e) => {
                    document.querySelector('#commentUser').innerHTML = ""
                    document.querySelector('#commentUser').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun membre trouvé</div></div>')
                    return
                })
        })
    }

    if (document.querySelector('#sendCommentTool')) {
        document.querySelector('#sendCommentTool').addEventListener('click', function () {
            const data = {
                idMember: parseInt(document.querySelector('#userIdCommentTool').value),
                idTool: parseInt(getUrlParameter('idTool')),
                dateTicket: new Date(),
                text: document.querySelector('#commentTextAreaTool').value
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/commentsTool`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-add-comment-tool .error-content').innerHTML = ""
                        document.querySelector('#panel-add-comment-tool .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                        throw new Error("Erreur lors de l'envoi des données")
                    }
                })
                .then(res => {
                    $('#panel-add-comment-tool').modal('toggle')
                    if (document.querySelector('#listCommentsTool')) {
                        refreshListCommentsTool('#listCommentsTool')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-add-comment-tool .error-content').innerHTML = ""
                    document.querySelector('#panel-add-comment-tool .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Erreur</div></div>')
                    return
                })
        })
    }

    const refreshListCommentsTool = (target) => {
        if (document.querySelector(target)) {
            const idTool = getUrlParameter('idTool')
            fetch(`/api/comments/tool/${idTool}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Aucun commentaire trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length) {
                        document.querySelector(target).innerHTML = ''
                        res.data.forEach((item, i) => {
                            document.querySelector(target).insertAdjacentHTML('beforeend',
                                `<div class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_commentaire}>
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">${item.prenom} ${item.nom}</h6>
                                        <small>${item.date_commentaire}</small>
                                    </div>
                                    <p class="my-4 text-place text-muted">${item.texte.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
                                </div>`)
                        })
                    }
                })
                .catch(() => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start">Aucun commentaire</div>')
                    return
                })
        }
    }

    if (document.querySelector('#listCommentsTool')) {
        refreshListCommentsTool('#listCommentsTool')
    }

    const refreshListProjectStatut = (target, type) => {
        if (document.querySelector('select#allProjectsByYear')) {
            let year = document.querySelector('select#allProjectsByYear').value
            document.querySelector('select#allProjectsByType').value = type
            if (document.querySelector(target)) {
                if (document.querySelector('#listProjectsOpen')) {
                    fetch(`/api/projects/statut/1?annee=${year}&type=${type}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                throw new Error("Aucun projet trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#listProjectsOpen').innerHTML = ''
                                res.data.forEach((item) => {
                                    const nbJoursProj = Math.round(Math.abs(new Date(item.date_fin).getTime() - new Date(item.date_debut).getTime()) / (1000 * 60 * 60 * 24))
                                    const nbJoursReste = Math.round((new Date(item.date_fin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                                    const ratio = (nbJoursReste < nbJoursProj) ? (100 - ((nbJoursReste * 100) / nbJoursProj)) : 0
                                    let content
                                    if (type === 'Projet') {
                                        content = `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet} (${nbJoursReste} jours restants)<div class="progress"><div class="progress-bar progress-bar-striped ${(ratio) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${ratio}%" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between"></div></a>`
                                    } else if (type === 'Routine') {
                                        content = `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet}</a>`
                                    }
                                    document.querySelector('#listProjectsOpen').insertAdjacentHTML('beforeend', content)
                                })
                            }
                        })
                        .catch((e) => {
                            document.querySelector('#listProjectsOpen').innerHTML = ''
                            document.querySelector('#listProjectsOpen').insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun projet trouvé</small></div>')
                            return
                        })
                }
                if (document.querySelector('#listProjectsWip')) {
                    fetch(`/api/projects/statut/2?annee=${year}&type=${type}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                throw new Error("Aucun projet trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#listProjectsWip').innerHTML = ''
                                res.data.forEach((item) => {
                                    const nbJoursProj = Math.round(Math.abs(new Date(item.date_fin).getTime() - new Date(item.date_debut).getTime()) / (1000 * 60 * 60 * 24))
                                    const nbJoursReste = Math.round((new Date(item.date_fin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                                    const ratio = (nbJoursReste < nbJoursProj) ? (100 - ((nbJoursReste * 100) / nbJoursProj)) : 0
                                    let content
                                    if (type === 'Projet') {
                                        content = `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet} (${nbJoursReste} jours restants)<div class="progress"><div class="progress-bar progress-bar-striped ${(ratio) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${ratio}%" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between"></div></a>`
                                    } else if (type === 'Routine') {
                                        content = `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet}</a>`
                                    }
                                    document.querySelector('#listProjectsWip').insertAdjacentHTML('beforeend', content)
                                })
                            }
                        })
                        .catch((e) => {
                            document.querySelector('#listProjectsWip').innerHTML = ''
                            document.querySelector('#listProjectsWip').insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun projet trouvé</small></div>')
                            return
                        })
                }
                if (document.querySelector('#listProjectsClosed')) {
                    fetch(`/api/projects/statut/3?annee=${year}&type=${type}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            } else {
                                throw new Error("Aucun projet trouvé")
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('#listProjectsClosed').innerHTML = ''
                                res.data.forEach((item) => {
                                    const nbJoursProj = Math.round(Math.abs(new Date(item.date_fin).getTime() - new Date(item.date_debut).getTime()) / (1000 * 60 * 60 * 24))
                                    const nbJoursReste = Math.round((new Date(item.date_fin).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                                    const ratio = (nbJoursReste < nbJoursProj) ? (100 - ((nbJoursReste * 100) / nbJoursProj)) : 0
                                    document.querySelector('#listProjectsClosed').insertAdjacentHTML('beforeend', `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet} (${nbJoursReste} jours restants)<div class="progress"><div class="progress-bar progress-bar-striped ${(ratio) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${ratio}%" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between"></div></a>`)
                                    let content
                                    if (type === 'Projet') {
                                        content = `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet} (${nbJoursReste} jours restants)<div class="progress"><div class="progress-bar progress-bar-striped ${(ratio) >= 100 ? 'bg-danger' : 'bg-dark'}" role="progressbar" style="width: ${ratio}%" aria-valuenow="${ratio}" aria-valuemin="0" aria-valuemax="100"></div></div><div class="d-flex w-100 justify-content-between"></div></a>`
                                    } else if (type === 'Routine') {
                                        content = `<a href="/projectView?idProject=${item.id_projet}" class="list-group-item" id=${item.id_projet}>${item.lib_projet}</a>`
                                    }
                                    document.querySelector('#listProjectsClosed').insertAdjacentHTML('beforeend', content)
                                })
                            }
                        })
                        .catch(() => {
                            document.querySelector('#listProjectsClosed').innerHTML = ''
                            document.querySelector('#listProjectsClosed').insertAdjacentHTML('beforeend', '<div class="list-group-item list-group-item-action flex-column align-items-start"><small>Aucun projet trouvé</small></div>')
                            return
                        })
                }
            }
        }
    }

    if (document.querySelector('select#memberProjectsByType')) {
        document.querySelector('select#memberProjectsByType').addEventListener('change', (event) => {
            const typeProj = document.querySelector('select#memberProjectsByType').value
            if (document.querySelector('#listMemberProjectsOpen')) {
                refreshProjectMember('#listMemberProjectsOpen', typeProj, 1)
            }
            if (document.querySelector('#listMemberProjectsWip')) {
                refreshProjectMember('#listMemberProjectsWip', typeProj, 2)
            }
            if (document.querySelector('#listMemberProjectsClosed')) {
                refreshProjectMember('#listMemberProjectsClosed', typeProj, 3)
            }
        })
    }

    if (document.querySelector('#projectByStatut')) {
        const typeProj = getUrlParameter('type')
        refreshListProjectStatut('#projectByStatut', typeProj)
    }

    if (document.querySelector('select#allProjectsByYear')) {
        document.querySelector('select#allProjectsByYear').addEventListener('change', (event) => {
            const typeProj = document.querySelector('select#allProjectsByType').value
            refreshListProjectStatut('#projectByStatut', typeProj)
        })
    }

    if (document.querySelector('select#allProjectsByType')) {
        document.querySelector('select#allProjectsByType').addEventListener('change', (event) => {
            const typeProj = document.querySelector('select#allProjectsByType').value
            refreshListProjectStatut('#projectByStatut', typeProj)
        })
    }

    const refreshListProjectRoutines = (target) => {
        if (document.querySelector(target)) {
            const idProject = parseInt(getUrlParameter('idProject'))
            fetch(`/api/project/${idProject}`)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        throw new Error("Aucun projet trouvé")
                    }
                })
                .then(res => {
                    if (res.data.length === 1) {
                        fetch(`/api/projectRelation?idRoutine=${idProject}&type=${res.data[0].type_projet}`)
                            .then(response => {
                                if (response.ok) {
                                    return response.json()
                                } else {
                                    throw new Error("Aucun projet trouvé")
                                }
                            })
                            .then(res => {
                                if (res.data.length) {
                                    document.querySelector(target).innerHTML = ''
                                    res.data.forEach((item) => {
                                        document.querySelector(target).insertAdjacentHTML('beforeend',
                                            `<div class="list-group-item list-group-item-action flex-column align-items-start" id=${item.id_projet}>
                                    <div class="d-flex w-100 justify-content-between">
                                        <h6 class="mb-1">${item.lib_projet}</h6>
                                    </div>
                                    <div class="my-3">
                                        <small><span class="badge text-${res.data[0].statut_class} border border-${res.data[0].statut_class}">${item.lib_statut}</span></small>
                                        <p class="mb-0"><small>Date début : ${item.date_debut}</small></p>
                                        <p class="mb-0"><small>Date fin : ${item.date_fin}</small></p>
                                        <p class="mb-0 text-place"><small>Description : ${item.description.replace(/(?:\r\n|\r|\n)/g, '<br>')}</small></p>
                                    </div>
                                    <small class="mr-3"><a href="/projectView?idProject=${item.id_projet}">Voir le projet</a></small>
                                </div>`)
                                    })
                                }
                            })
                            .catch((e) => {
                                document.querySelector(target).innerHTML = ''
                                document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                                return
                            })
                    }
                })
                .catch((e) => {
                    document.querySelector(target).innerHTML = ''
                    document.querySelector(target).insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                    return
                })
        }
    }

    if (document.querySelector('#listProjectLinks')) {
        refreshListProjectRoutines('#listProjectLinks')
    }

    $('#panel-project-add-link').on('show.bs.modal', function (e) {
        document.querySelector('select#linkProject').value = ''
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#linkUserName').innerHTML = ""
                    document.querySelector('#linkUserName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                    throw new Error("Aucun projet trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#linkUserId').value = res.user.id_membre
                    document.querySelector('#linkUserName').innerHTML = ""
                    document.querySelector('#linkUserName').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#linkUserName').innerHTML = ""
                    document.querySelector('#linkUserName').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#affectProjectLink').setAttribute('disabled', '')
                    document.querySelector('#affectProjectLink').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('select#linkProject')) {
                    fetch(`/api/projects/type/Projet`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#linkProject').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#linkProject').insertAdjacentHTML('beforeend', '<option value="' + item.id_projet + '">' + item.lib_projet + '</option>')
                                })
                            }
                        })
                }
            })
            .catch((e) => {
                document.querySelector('#linkUserName').innerHTML = ""
                document.querySelector('#linkUserName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#affectProjectLink')) {
        document.querySelector('#affectProjectLink').addEventListener('click', function () {
            const data = {
                idRoutine: parseInt(getUrlParameter('idProject')),
                idProject: parseInt(document.querySelector('select#linkProject').value)
            }
            const postMethod = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/projectRelation`, postMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        document.querySelector('#panel-project-add-link .error-content').innerHTML = ""
                        document.querySelector('#panel-project-add-link .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Routine déjà affectée à ce projet</div></div>')
                        throw new Error("Routine déjà affectée à ce projet")
                    }
                })
                .then(res => {
                    $('#panel-project-add-link').modal('toggle')
                    if (document.querySelector('#listProjectLinks')) {
                        refreshListProjectRoutines('#listProjectLinks')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-project-add-link .error-content').innerHTML = ""
                    document.querySelector('#panel-project-add-link .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    $('#panel-project-cut-link').on('show.bs.modal', function (e) {
        document.querySelector('select#linkProject').value = ''
        fetch(`/api/user_data`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    document.querySelector('#cutLinkUserName').innerHTML = ""
                    document.querySelector('#cutLinkUserName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                    throw new Error("Aucun projet trouvé")
                }
            })
            .then(res => {
                if (res.hasOwnProperty('user')) {
                    document.querySelector('#cutLinkUserId').value = res.user.id_membre
                    document.querySelector('#cutLinkUserName').innerHTML = ""
                    document.querySelector('#cutLinkUserName').append('Connecté en ' + res.user.prenom + ' ' + res.user.nom)
                } else {
                    document.querySelector('#cutLinkUserName').innerHTML = ""
                    document.querySelector('#cutLinkUserName').insertAdjacentHTML('beforeend', '<a href="/login">Veuillez vous connecter</a>')
                    document.querySelector('#sendCutProjectLink').setAttribute('disabled', '')
                    document.querySelector('#sendCutProjectLink').style.color = 'grey'
                }
            })
            .then(() => {
                if (document.querySelector('select#cutLinkProject')) {
                    const idRoutine = parseInt(getUrlParameter('idProject'))
                    fetch(`/api/projectRelation?idRoutine=${idRoutine}`)
                        .then(response => {
                            if (response.ok) {
                                return response.json()
                            }
                        })
                        .then(res => {
                            if (res.data.length) {
                                document.querySelector('select#cutLinkProject').innerHTML = ""
                                res.data.forEach((item) => {
                                    document.querySelector('select#cutLinkProject').insertAdjacentHTML('beforeend', '<option value="' + item.id_projet + '">' + item.lib_projet + '</option>')
                                })
                            }
                        })
                }
            })
            .catch((e) => {
                document.querySelector('#cutLinkUserName').innerHTML = ""
                document.querySelector('#cutLinkUserName').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">Aucun projet trouvé</div></div>')
                return
            })
    })

    if (document.querySelector('#sendCutProjectLink')) {
        document.querySelector('#sendCutProjectLink').addEventListener('click', function () {
            const data = {
                idRoutine: parseInt(getUrlParameter('idProject')),
                idProject: parseInt(document.querySelector('select#cutLinkProject').value)
            }
            const deleteMethod = {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(data)
            }
            fetch(`/api/projectRelation`, deleteMethod)
                .then(response => {
                    if (response.ok) {
                        return response.json()
                    }
                })
                .then(() => {
                    $('#panel-project-cut-link').modal('toggle')
                    if (document.querySelector('#listProjectLinks')) {
                        refreshListProjectRoutines('#listProjectLinks')
                    }
                })
                .catch((e) => {
                    document.querySelector('#panel-project-cut-link .error-content').innerHTML = ""
                    document.querySelector('#panel-project-cut-link .error-content').insertAdjacentHTML('beforeend', '<div class="alert-infos mt-3"><div class="alert alert-dark" role="alert">' + String(e) + '</div></div>')
                    return
                })
        })
    }

    // Rechargement à chaud, seulement en environnement de développement
    if (module.hot) {
        module.hot.accept(function () {
            window.location.reload()
        })
    }
});
