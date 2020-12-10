const jwt = require('jsonwebtoken');
const config = require('../config');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Authentication invalid.' });
  }

  try {
    console.log("hello dukh")
    const decodedToken = jwt.verify(token, 'development_secret' , { //config.jwt.secret .slice(7)
      algorithm: 'HS256',
      expiresIn: config.jwt.expiry
    });
    console.log("hello dukh")
    req.user = decodedToken;
    console.log("hello dukh2")

    next();
    
  } catch (error) {
    return res.status(401).json({
      "hell":"hfsdkj",
      message: error.message
    });
  }
};

module.exports = requireAuth;
