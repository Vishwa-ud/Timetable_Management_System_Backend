const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTPRIVATEKEY;

function authenticateUser(req, res, next) {
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        // Remove "Bearer " prefix if it exists
        const tokenWithoutBearer = token.replace(/^Bearer\s/, '');

        // Verify token without "Bearer" prefix
        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWTPRIVATEKEY);

        // Attach decoded user information to the request object
        req.user = decoded;
        next();
    } catch (error) {
        // If token verification fails, send an error response
        res.status(400).send({ message: 'Invalid token.' });
    }
}
// Middleware for authorizing user based on role
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({ message: 'Access denied. You do not have permission to access this resource.' });
        }
        next();
    }
}

module.exports = { authenticateUser, authorizeRole };