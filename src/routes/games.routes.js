const express = require('express');
const router = express.Router();
const {
    createGameController,
    getGamesController,
    getGameController,
    deleteGameController,
    makeMoveController
} = require('../controllers/games.controller');

router.post('/', createGameController);
router.get('/', getGamesController);
router.get('/:id', getGameController);
router.delete('/:id', deleteGameController);
router.put('/:id/move', makeMoveController);

module.exports = router;