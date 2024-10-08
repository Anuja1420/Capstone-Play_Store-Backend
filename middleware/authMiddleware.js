const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BlacklistedToken = require('../models/blacklistedToken.js');



// Protect routes (ensure the user is logged in)
const protect = async (req, res, next) => {//Need to provide token for authorization
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; //Splits the authorization header into two parts
      //The first part ([0]) will be the string Bearer, and the second part ([1]) will be the actual token.


  // Check if token is blacklisted
  const blacklistedToken = await BlacklistedToken.findOne({ token });

  if (blacklistedToken) return res.status(403).json({ message: 'Token has been blacklisted' });

      // Verify the token
      const decoded = jwt.verify(token, 'jwt_secret_token'); // Write this "jwt_secret_token" token in JWT Bearer while register and login
      req.user = await User.findById(decoded.id).select('-password'); //"-password" --> password excluded
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Admin middleware (ensure the user is an admin)
const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {//Only admin can access those routes
      next();
  } else {
      res.status(403).json({ message: 'Not authorized as a user' });
  }
};
  

module.exports = { protect , admin };
