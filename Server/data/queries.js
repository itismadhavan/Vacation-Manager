const Pool = require('pg').Pool
const pool = new Pool({
  user: 'vmsys',
  host: 'localhost',
  database: 'vacationmanager',
  password: '12345',
  port: 5432,
})

const findUserById = (userID) => {
  return pool.query('SELECT * FROM users WHERE slack_user_id = $1', [userID])
    .then((value) => {
      return value.rowCount > 0;
    })
    .catch((err) => {
      throw err;
    })
}

const createUser = (user) => {
  const { name, email, profile_image_url, slack_user_id } = user
  pool.query('INSERT INTO users (name, email,profile_image_url,slack_user_id) VALUES ($1, $2, $3, $4)',
    [name, email, profile_image_url, slack_user_id],
    (error, results) => {
      if (error) {
        throw error
      }
      return { success: true }
    })
}


const findTeamById = (teamID) => {
  return pool.query('SELECT * FROM teams WHERE slack_team_id = $1', [teamID])
    .then((value) => {
      return value.rowCount > 0;
    })
    .catch((err) => {
      throw err;
    })
}

const createTeam = (team) => {
  const { name, domain, slack_team_id } = team
  pool.query('INSERT INTO teams (name, domain,slack_team_id) VALUES ($1, $2, $3)',
    [name, domain, slack_team_id],
    (error, results) => {
      if (error) {
        throw error
      }
      return { success: true }
    })
}


module.exports = {
  findUserById,
  createUser,
  findTeamById,
  createTeam
}