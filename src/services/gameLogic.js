const ROWS = 6;
const COLS = 7;

function createEmptyBoard() {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function cloneBoard(board) {
    return board.map(row => [...row]);
}

function dropDisc(board, col, player) {
    const newBoard = cloneBoard(board);
    for (let row = ROWS - 1; row >= 0; row--) {
        if (newBoard[row][col] === null) {
            newBoard[row][col] = player;
            return { board: newBoard, row, col };
        }
    }
    throw new Error('Kolumna jest pełna');
}

function checkWin(board, lastRow, lastCol) {
    const player = board[lastRow][lastCol];
    if (!player) return false;

    const directions = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
        { dr: 1, dc: 1 },
        { dr: 1, dc: -1 }
    ];

    for (const { dr, dc } of directions) {
        let count = 1;
        let r = lastRow + dr;
        let c = lastCol + dc;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
            count++;
            r += dr;
            c += dc;
        }
        r = lastRow - dr;
        c = lastCol - dc;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
            count++;
            r -= dr;
            c -= dc;
        }
        if (count >= 4) return true;
    }
    return false;
}

function checkDraw(board) {
    return board[0].every(cell => cell !== null);
}
module.exports = {
    ROWS,
    COLS,
    createEmptyBoard,
    dropDisc,
    checkWin,
    checkDraw
};