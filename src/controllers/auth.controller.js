const User = require('../models/user.model');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../utils/jwt');

function registerController(req, res) {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json({ error: 'username i password są wymagane' });
    if (User.getUserByUsername(username))
        return res.status(400).json({ error: 'Użytkownik już istnieje '});
    const passwordHash = hashPassword(password);
    const user = User.createUser(username, passwordHash);
    res.status(201).json({ message: 'Utworzono użytkownika', user });
}

function loginController(req, res) {
    const { username, password } = req.body;
    const user = User.getUserByUsername(username);
    if (!user)
        return res.status(400).json({ error: 'Nieprawidłowe dane logowania' });
    if (!comparePassword(password, user.passwordHash))
        return res.status(400).json({ error: 'Nieprawidłowe dane logowania' });
    const token = generateToken(user);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 36000000
    });
    res.json({ message: 'Zalogowano', user });
}

function logoutController(req, res) {
    res.clearCookie('token');
    res.json({ message: 'Wylogowano' });
}

module.exports = {
    registerController,
    loginController,
    logoutController
};