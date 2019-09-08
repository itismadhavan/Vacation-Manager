const express = require('express');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');
const routerGuard = require('./routerguard');
const cookieParser = require('cookie-parser');
const secret = 'madhavan';

const cookieExpiry = '1h';
const helper = require('./api/ApiHelper');

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cookieParser());

const server = require('http').createServer(app);

app.get('/api/slackAuth', (req, res) => {
  helper.getAuthToken(req.query.code)
    .then((response) => {
      const user = {
        id: response.user.id,
        name: response.user.name,
        photo: response.user.image_48,
        accessToken: response.access_token
      }
      const token = jwt.sign(user, secret, {
        expiresIn: cookieExpiry
      });
      res.cookie('authtoken', token, { httpOnly: true })
        .redirect("http://localhost:3000/home")
    })
    .catch((err) => console.log(err))
})

app.get('/api/authenticate', routerGuard, (req, res) => {
  res.sendStatus(200);
});


app.get('/api/logout', routerGuard, (req, res) => {
  res.cookie('authtoken', 0, { httpOnly: true })
    .sendStatus(200);
});

//Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '../client/build/index.html'));
});



const port = process.env.PORT || 5000;
server.listen(port);

console.log('App is listening on port ' + port);