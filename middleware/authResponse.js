const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(500).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, 'recruitment_token', (err, user) => {
        if (err) return res.status(500).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;
