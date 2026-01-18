const users = [];
let nextId = 1;

function createUser(username, passwordHash) {
    const user = {
        id: nextId++,
        username,
        passwordHash
    };
    users.push(user);
    return user;
}

function getUserByUsername(username) {
    return users.find(u => u.username === username);
}

function getUserById(id) {
    return users.find(u => u.id === id);
}

module.exports = {
    createUser,
    getUserByUsername,
    getUserById
};