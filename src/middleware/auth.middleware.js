const { verifyToken } = require('../utils/jwt');
const User = require('../models/user.model');

function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({ error: 'Brak tokenu '});
    try {
        const decoded = verifyToken(token);
        req.user = User.getUserById(decoded.id);
        next();
    } catch (err) {
        res.status(401).json({ error: 'Nieprawidłowy token '});
    }
}

module.exports = authMiddleware;