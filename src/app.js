const { createEmptyBoard, dropDisc, checkWin } = require('./services/gameLogic');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const gamesRoutes = require('./routes/games.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/games', gamesRoutes);
app.use('/api/auth' , authRoutes);
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/api/test-move', (req, res) => {
    let board = createEmptyBoard();
    let move = dropDisc(board, 3, 'R');
    let win = checkWin(move.board, move.row, move.col);
    res.json({
        board: move.board,
        win
    });
});

module.exports = app;