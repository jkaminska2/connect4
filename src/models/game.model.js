const { createEmptyBoard } = require('../services/gameLogic');

let games = [];
let nextId = 1;

function createGame(player1Id, player2Id) {
    const game = {
        id: nextId++,
        board: createEmptyBoard(),
        player1Id,
        player2Id,
        currentPlayer: player1Id,
        winner: null
    };
    games.push(game);
    return game;
}

function getAllGames() {
    return games;
}

function getGameById(id) {
    return games.find(g => g.id === id);
}

function deleteGame(id) {
    games = games.filter(g = g.id !== id);
}

module.exports = {
    createGame,
    getAllGames,
    getGameById,
    deleteGame
};