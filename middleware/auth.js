const jwt = require('jsonwebtoken')
let SECRETKEY = process.env.SECRET_KEY

module.exports = (req, res, next)=>{
  const token = req.header('x-auth-token');
  // console.log(token)  
  // Check for token
  if (!token) return res.json({status:false, message: 'No token, authorizaton denied' });
  try {
    // Verify token
    const decoded = jwt.verify(token, SECRETKEY);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {    
    res.json({status:false, message: 'Token is not valid' });
  }
};