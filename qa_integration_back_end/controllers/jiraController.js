const jiraUtils = require('../utils/jiraUtils')

const GetJiraItems = async (req, res) => {
    const { jira_token, item_id } = req.body
    const jira_item = await jiraUtils.getJiraWI(jira_token, item_id)
    return res.send(jira_item.data)
}

const MigrateItems = async (req, res) => {
    const { tfs_token, jira_token, item_list, jira_test_plan } = req.body
    const migrate_res = await jiraUtils.migrateItems(item_list, tfs_token, jira_token, jira_test_plan)
    return res.send(migrate_res)
}

const JiraSanity = async (req, res) => {
    try {
        const jira_token = req.body.jira_token
        const user_info = await jiraUtils.getSelfInfoJira(jira_token)
        const user_details = await jiraUtils.getPersonalInfo(jira_token, user_info.name)
        const user_reponse = {
            id: user_details.accountId,
            name: user_details.displayName
        }
        return res.send(user_reponse)
    } catch (error) {
        return res.send({
            status: 500,
            message: 'There was an error'
        })

    }
}

module.exports = {
    GetJiraItems: GetJiraItems,
    MigrateItems: MigrateItems,
    JiraSanity: JiraSanity
}