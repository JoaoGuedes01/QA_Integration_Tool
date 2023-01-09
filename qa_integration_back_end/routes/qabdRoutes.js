const express = require('express')
const qabdController = require('../controllers/qabdController.js')
const router = express.Router()

router.post('/team', qabdController.CreateTeamConfig)
router.get('/teams', qabdController.GetTeams)
router.get('/next-sprint', qabdController.NextSprint)


module.exports = router

