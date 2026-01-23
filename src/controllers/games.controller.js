const Game = require('../models/game.model');
const { dropDisc, checkWin, checkDraw } = require('../services/gameLogic');

function createGameController(req, res) {
    const { player1Id, player2Id } = req.body;
    const ownerId = req.user.id;
    if (!player1Id || !player2Id) {
        return res.status(400).json({ error: 'player1Id i player2Id są wymagane' });
    }
    const game = Game.createGame(ownerId, player1Id, player2Id);
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
    if (game.ownerId !== req.user.id) {
        return res.status(403).json({ error: 'Nie masz uprawnień do usunięcia tej gry' });
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
    if (player !== game.player1Id && player !== game.player2Id) {
        return res.status(403).json({ error: 'Nie jesteś graczem w tej grze' });
    }
    if (game.currentPlayer !== player) {
        return res.status(400).json({ error: 'Teraz nie jest kolej tego gracza' });
    }
    try {
        const move = dropDisc(game.board, col, player);
        game.board = move.board;
        if (checkWin(game.board, move.row, move.col)) {
            game.winner = player;
        } else if (checkDraw(game.board)) {
            game.winner = 'draw';
        } else {
            game.currentPlayer = (player === game.player1Id)
                ? game.player2Id
                : game.player1Id;
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