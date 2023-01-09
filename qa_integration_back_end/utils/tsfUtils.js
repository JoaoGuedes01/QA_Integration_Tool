const axios = require('axios')

const getTFSWI = async (tfs_token, query_id) => {
    const config = {
        method: 'get',
        url: 'http://tfs2013:8080/tfs/DefaultCollection/Enterprise/_apis/wit/wiql/' + query_id,
        headers: {
            // <email>:<passowrd> -> encoded in base64
            'Authorization': 'Basic ' + tfs_token
        }
    };

    try {
        const tfs_response = await axios(config)
        const workitems = tfs_response.data.workItems
        return workitems
    } catch (error) {
        return {
            status: 500,
            message: 'there was an error: ' + error
        }
    }
}

const getWorkItem = async (tfs_token, item_url) => {
    console.log(item_url)
    try {
        const config = {
            method: 'get',
            url: item_url,
            headers: {
                'Authorization': 'Basic ' + tfs_token
            }
        };
        const work_item = await axios(config)
        const response_tfs = {
            title: work_item.data.fields["System.Title"],
            wi_type: work_item.data.fields["System.WorkItemType"]
        }
        return response_tfs
    } catch (error) {
        console.log(error)
        return 'error'
    }
}

const SanityTFS = async (tfs_token) => {
    const config = {
        method: 'get',
        url: 'http://tfs2013:8080/tfs/DefaultCollection/Enterprise/_apis/git/repositories/CxEngine',
        headers: {
            'Authorization': 'Basic ' + tfs_token,
        }
    };
    const jira_response = await axios(config)
    return jira_response.data
}

const GetTFSItemDetails = async (tfs_token, item_id) => {
    var config = {
        method: 'get',
        url: 'http://tfs2013:8080/tfs/DefaultCollection/Enterprise/_apis/wit/workitems/' + item_id + '?$expand=relations',
        headers: {
            'Authorization': 'Basic ' + tfs_token,
            'Content-Type': 'application/json-patch+json',
        }
    };
    const tfs_response = await axios(config)
    return tfs_response.data
}


const CommentTFSItem = async (tfs_token, item_id, comment) => {
    const data = JSON.stringify({
        "text": comment
    });

    const config = {
        method: 'post',
        url: 'http://tfs2013:8080/tfs/DefaultCollection/Enterprise/_apis/wit/workitems/' + item_id + '/comments?api-version=6.0-preview',
        headers: {
            'Authorization': 'Basic ' + tfs_token,
            'Content-Type': 'application/json'
        },
        data: data
    };

    const tfs_res = await axios(config)
    return tfs_res.data
}

const getTFSWIDetails = async (tfs_token, url) => {
    var config = {
        method: 'get',
        url: url,
        headers: {
            'Authorization': 'Basic ' + tfs_token
        }
    };

    const tfs_response = await axios(config)

    return tfs_response.data
}

module.exports = {
    getTFSWI: getTFSWI,
    getWorkItem: getWorkItem,
    GetTFSItemDetails: GetTFSItemDetails,
    SanityTFS: SanityTFS,
    CommentTFSItem: CommentTFSItem,
    getTFSWIDetails: getTFSWIDetails
}