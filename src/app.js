const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;