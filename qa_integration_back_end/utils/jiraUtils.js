const axios = require('axios')
const tfsUtils = require('../utils/tsfUtils')

const getJiraWI = async (jira_token, item_id) => {
    try {
        var config = {
            method: 'get',
            url: 'https://checkmarx.atlassian.net/rest/api/latest/issue/' + item_id,
            headers: {
                'Authorization': 'Basic ' + jira_token,
                'Content-Type': 'application/json',
            }
        };

        const jira_response = await axios(config)
        return jira_response
    } catch (error) {
        return {
            status: 500,
            message: 'There was an error'
        }
    }
}

const migrateItems = async (item_list, tfs_token, jira_token, jira_test_plan) => {
    for (let i = 0; i < item_list.length; i++) {
        const workitem = item_list[i];
        if (workitem.selected === true) {
            const itemdetails = await tfsUtils.getTFSWIDetails(tfs_token, workitem.url)
            const workitem_title = itemdetails.fields["System.Title"]

            let workitem_desc = 'This work item does not have a description, this is an automatic description'
            if (itemdetails.fields.hasOwnProperty('System.Description')) {
                workitem_desc = itemdetails.fields["System.Description"].replace(/<[^>]*>?/gm, '');
            }

            const jira_response = await createJiraItem(workitem_title, workitem_desc, jira_test_plan, "610141fb75ad960069d4d567", jira_token)
        }
    }

    console.log('All items parsed and migrated')
    return 'ok'
}

const getSelfInfoJira = async (jira_token) => {
    try {
        const config = {
            method: 'get',
            url: 'https://checkmarx.atlassian.net/rest/auth/latest/session',
            headers: {
                'Authorization': 'Basic ' + jira_token,
                'Content-Type': 'application/json',
            }
        };
        const jira_response = await axios(config)
        return jira_response.data
    } catch (error) {
        console.log(error)
        return 'error'
    }
}


const getPersonalInfo = async (jira_token, accountId) => {
    const config = {
        method: 'get',
        url: 'https://checkmarx.atlassian.net/rest/api/latest/user?accountId=' + accountId,
        headers: {
            'Authorization': 'Basic ' + jira_token,
            'Content-Type': 'application/json',
        }
    };
    const jira_response = await axios(config)
    return jira_response.data
}

const createJiraItem = async (summary, workitem_desc, parent_jira, assign_to, jira_token) => {
    const data = JSON.stringify({
        "fields": {
            "summary": summary,
            "issuetype": {
                "name": "Sub-task"
            },
            "description": workitem_desc,
            "parent": {
                "key": parent_jira
            },
            "project": {
                "key": "CQ"
            },
            "assignee": {
                "accountId": assign_to
            }
        }
    });

    var config = {
        method: 'post',
        url: 'https://checkmarx.atlassian.net/rest/api/latest/issue',
        headers: {
            'Authorization': 'Basic ' + jira_token,
            'Content-Type': 'application/json',
        },
        data: data
    };

    try {
        const jira_response = await axios(config)

        return jira_response.data
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    getJiraWI: getJiraWI,
    migrateItems: migrateItems,
    getSelfInfoJira: getSelfInfoJira,
    getPersonalInfo: getPersonalInfo,
    createJiraItem: createJiraItem
}