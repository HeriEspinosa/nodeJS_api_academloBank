const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users.routes');
const transfersRouter = require('./routes/transfers.routes');
const app = express();

// app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//RUTAS
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/transfers', transfersRouter);

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: `Can't find ${req.originalUrl} on this server🧨, 404`,
    });
    next();
});

module.exports = app;
