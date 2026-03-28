const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'No token' });
    }

    // Accept both "Bearer <token>" and raw token for compatibility.
    const token = authHeader.toLowerCase().startsWith('bearer ')
        ? authHeader.slice(7).trim()
        : authHeader.trim();

    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, 'secret_key');
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
};

module.exports = authMiddleware;

