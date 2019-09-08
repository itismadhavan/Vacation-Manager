const jwt = require('jsonwebtoken');
const secret = 'madhavan';
const routerGuard = function (req, res, next) {
  const token = req.cookies.authtoken;
 
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}
module.exports = routerGuard;