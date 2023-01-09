const TeamConfig = require('../models/TeamConfig')

const CreateTeamConfig = async (req, res) => {
    const { team_id, team_title, team_members, chosen } = req.body

    const newTeamConfig = new TeamConfig({
        team_id: team_id,
        team_title: team_title,
        team_members: team_members.split('_'),
        chosen: chosen
    })

    const db_res = await newTeamConfig.save()

    return res.send(db_res)
}

const GetTeams = async (req, res) => {

    const db_res = await TeamConfig.find()

    return res.send(db_res)
}

const NextSprint = async (req, res) => {

    const teams = await TeamConfig.find()

    for (let i = 0; i < teams.length; i++) {
        const team = teams[i];
        const chosen = team.chosen
        const chosen_index = team.team_members.indexOf(chosen)
        let next_chosen = team.team_members[0]

        if (chosen_index !== team.team_members.length - 1) {
            next_chosen = team.team_members[chosen_index + 1]
        }

        dbresp = await TeamConfig.updateOne({ team_id: team.team_id }, {
            chosen: next_chosen
        })

    }

    return res.send('ok')
}

module.exports = {
    CreateTeamConfig: CreateTeamConfig,
    GetTeams: GetTeams,
    NextSprint: NextSprint
}