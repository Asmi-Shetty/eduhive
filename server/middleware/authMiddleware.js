const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.id }; 
    console.log("Decoded Token:", decoded);
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = { authenticateJWT }; // Export as an object
