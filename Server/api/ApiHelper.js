const apiHandler = require('./apiUtils');
const clientID = "672673271492.745892959601";
const clientSecret = "77b6ae2dd07571ea135b1692bce6b554"
//const baseUrl = ;

function getAuthToken(code) {
  return apiHandler.make_API_call(`https://slack.com/api/oauth.access?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`)
}

module.exports = { getAuthToken };