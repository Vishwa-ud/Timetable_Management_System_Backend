const jwt = require('jsonwebtoken');
const secretKey = process.env.JWTPRIVATEKEY;

// Middleware for authenticating user based on JWT token
function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
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