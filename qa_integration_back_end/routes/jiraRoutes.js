const express = require('express')
const jiraController = require('../controllers/jiraController.js')
const router = express.Router()



module.exports = router

router.post('/items', jiraController.GetJiraItems)
router.post('/migrate', jiraController.MigrateItems)
router.post('/sanity', jiraController.JiraSanity)
