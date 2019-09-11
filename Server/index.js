const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const routerGuard = require('./routerguard');
const cookieParser = require('cookie-parser');
const secret = 'madhavan';

const cookieExpiry = '1h';
const helper = require('./api/ApiHelper');
const db = require('./data/queries')

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../Client/build')));
app.use(cookieParser());

const server = require('http').createServer(app);

app.get('/api/slackAuth', (req, res) => {
  helper.getAuthToken(req.query.code)
    .then((response) => {
      const user = {
        slack_user_id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        profile_image_url: response.user.image_48,
        accessToken: response.access_token
      }
      const team = {
        slack_team_id: response.team.id,
        name: response.team.name,
        domain: response.team.domain
      }

      db.findUserById(user.slack_user_id)
        .then((found) => {
          if (!found) {
            db.createUser(user);
          }
        })
        .catch((err) => {
          throw err;
        })

      db.findTeamById(team.slack_team_id)
        .then((found) => {
          if (!found) {
            db.createTeam(team);
          }
        })
        .catch((err) => {
          throw err;
        })

      const token = jwt.sign(user, secret, {
        expiresIn: cookieExpiry
      });
      res.cookie('authtoken', token, { httpOnly: true })
        .redirect(`http://localhost:3000/login?name=${encodeURI(user.name)}&photo=${encodeURI(user.profile_image_url)}`)
    })
    .catch((err) => console.log(err))
})

app.get('/api/authenticate', routerGuard, (req, res) => {
  res.sendStatus(200);
});

app.get('/users', (req, res) => {
  db.getUsers(req, res);
});

app.get('/api/logout', routerGuard, (req, res) => {
  res.cookie('authtoken', 0, { httpOnly: true })
    .sendStatus(200);
});

//Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../Client/build/index.html'));
});

const port = process.env.PORT || 5000;
server.listen(port);

console.log('App is listening on port ' + port);