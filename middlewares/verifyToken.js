const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        const error = new Error('Invalid Authorization Header!');
        error.status = 401;
        throw error;
    }
 
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'alimahdavi');
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error('Invalid Token!');
        error.status = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
    
}