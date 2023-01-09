const tfsUtils = require('../utils/tsfUtils')

const getTFSWorkItems = async (req, res) => {
    const tfs_token = req.body.tfs_token
    const query_id = req.body.query_id
    const tfs_response = await tfsUtils.getTFSWI(tfs_token, query_id)

    let titles = []
    for (let i = 0; i < tfs_response.length; i++) {
        const work_item = tfs_response[i];
        const work_item_details = await tfsUtils.getWorkItem(tfs_token, work_item.url)
        const work_item_title = work_item_details.title
        const work_item_type = work_item_details.wi_type
        titles.push({ id: work_item.id, url: work_item.url, title: work_item_title, type: work_item_type, selected: false, repeated: false })
    }
    return res.send(titles)
}

const SanityTFS = async (req, res) => {
    try {
        const tfs_token = req.body.tfs_token
        const tfs_response = await tfsUtils.SanityTFS(tfs_token)
        return res.send(tfs_response)
    } catch (error) {
        return res.send({
            status: 500,
            message: 'There was an error'
        })
    }
}

const TFSGetWorkItemDetails = async (req, res) => {
    const { tfs_token, item_id } = req.body
    console.log(req.body)
    const tfs_response = await tfsUtils.GetTFSItemDetails(tfs_token, item_id)
    return res.send(tfs_response)
}

const TFSCommentWorkItem = async (req, res) => {
    const { tfs_token, item_id, comment } = req.body
    console.log(req.body)
    const tfs_response = await tfsUtils.CommentTFSItem(tfs_token, item_id, comment)
    return res.send(tfs_response)
}


module.exports = {
    getTFSWorkItems: getTFSWorkItems,
    TFSGetWorkItemDetails: TFSGetWorkItemDetails,
    SanityTFS: SanityTFS,
    TFSCommentWorkItem: TFSCommentWorkItem
}