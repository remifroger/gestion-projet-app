const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
const passport = require('passport')
const { config } = require('../../middlewares/config.js')
const authChecker = require('../../middlewares/authorization.js')

router.get("/home", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("index", { user: req.user })
})
router.get("/groupView", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("groupView", { user: req.user })
})
router.get("/memberView", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("memberView", { user: req.user })
})
router.get("/projectView", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("projectView", { user: req.user })
})
router.get("/ticketView", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("ticketView", { user: req.user })
})
router.get("/allTickets", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("allTickets", { user: req.user })
})
router.get("/allProjects", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("allProjects", { user: req.user })
})
router.get("/categoryView", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("categoryView", { user: req.user })
})
router.get("/toolView", /*authChecker.checkNotAuthenticated, config.global(),*/ (req, res) => {
    res.render("toolView", { user: req.user })
})
router.get("/login", authChecker.checkAuthenticated, (req, res) => {
    res.render("login", { message: req.flash('error') })
})
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/home",
        failureRedirect: "/login",
        failureFlash: true
    })
)
router.get("/logout", (req, res) => {
    req.logout()
    res.redirect('/login')
})

module.exports = router