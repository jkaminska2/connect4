const jwt = require('jsonwebtoken');
const SECRET = 'super_secret_key';

function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username },
        SECRET,
        { expiresIn: '1h' }
    );
}

function verifyToken(token) {
    return jwt.verify(token, SECRET);
}

module.exports = {
    generateToken,
    verifyToken
};