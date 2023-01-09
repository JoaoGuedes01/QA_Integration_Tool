const express = require('express')
const tfsController = require('../controllers/tfsController')
const router = express.Router()

//was /api/tfs changed to/api/tfs/get-items
router.post('/get-items', tfsController.getTFSWorkItems)

// was /api/sanity/tfs changed to /api/tfs/sanity
router.post('/sanity', tfsController.SanityTFS)

//was /api/tfs/itemdetails changed to/api/tfs/get-items
router.post('/get-item-details', tfsController.TFSGetWorkItemDetails)

//was /api/tfs/comment changed to/api/tfs/comment
router.post('/comment', tfsController.TFSCommentWorkItem)


module.exports = router

