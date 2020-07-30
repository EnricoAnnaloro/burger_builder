/*
    Middleware to protect routes with authentication
*/

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    /*  
        Purpose of the function is to get the token
        and check if the token is valid before calling next
    */
    
    const token = req.header('x-auth-token');
    
    // Check if token exists
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {    
        // If token exist then verify token
        const decodedToken = jwt.verify(token, process.env.JWT_PASS);
    
        // Add user from payload
        req.user = decodedToken;

        console.log(decodedToken);
    
        next();        
    } catch (e) {
        // Non valid token
        res.status(400).json({ msg: 'Token is not valid' });

    }    
}

module.exports = authMiddleware;