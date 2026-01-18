const Game = require('../models/game.model');
const { dropDisc, checkWin, checkDraw } = require('../services/gameLogic');

function createGameController(req, res) {
    const { player1Id, player2Id } = req.body;
    if (!player1Id || !player2Id) {
        return res.status(400).json({ error: 'player1Id i player2Id są wymagane' });
    }
    const game = Game.createGame(player1Id, player2Id);
    res.status(201).json(game);
}

function getGamesController(req, res) {
    res.json(Game.getAllGames());
}

function getGameController(req, res) {
    const id = Number(req.params.id);
    const game = Game.getGameById(id);
    if (!game) {
        return res.status(404).json({ error: 'Gra nie znaleziona' });
    }
    res.json(game);
}

function deleteGameController(req, res) {
    const id = Number(req.params.id);
    const game = Game.getGameById(id);
    if (!game) {
        return res.status(404).json({ error: 'Gra nie znaleziona '});
    }
    Game.deleteGame(id);
    res.json({ message: 'Gra usunięta '});
}

function makeMoveController(req, res) {
    const id = Number(req.params.id);
    const { col, player } = req.body;
    const game = Game.getGameById(id);
    if (!game) {
        return res.status(404).json({ error: 'Gra nie znaleziona' });
    }
    try {
        const move = dropDisc(game.board, col, player);
        game.board = move.board;
        if (checkWin(game.board, move.row, move.col)) {
            game.winner = player;
        } else if (checkDraw(game.board)) {
            game.winner = 'draw';
        }
        res.json(game);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

module.exports = {
    createGameController,
    getGamesController,
    getGameController,
    deleteGameController,
    makeMoveController
};