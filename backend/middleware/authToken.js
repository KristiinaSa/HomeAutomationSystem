const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Try to get the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // If no token in the Authorization header, try to get it from the query parameters
  const queryToken = req.query.access_token;

  const finalToken = token || queryToken;

  if (finalToken == null) return res.sendStatus(401);

  jwt.verify(finalToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
