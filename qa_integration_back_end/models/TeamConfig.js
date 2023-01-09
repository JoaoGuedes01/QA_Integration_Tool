const mongoose = require('mongoose');

const TeamConfigSchema = new mongoose.Schema({
    team_id: {
        "type": String
    },
    team_title: {
        "type": String
    },
    team_members: {
        "type": Array
    },
    chosen: {
        "type": 'String'
    }
})

module.exports = mongoose.model('TeamConfig', TeamConfigSchema);