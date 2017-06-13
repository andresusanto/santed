'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');

const app = express();

const expressLogger = (req, res, next) => {
    console.log(`[REQUEST LOGGER] ${req.method} ${req.url} with request header ${JSON.stringify(req.headers)} and body ${JSON.stringify(req.body)}`);
    next();
};

const jsonErrorHandler = (error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400).json({ status: 'Bad Request', code: '400', message: 'Invalid JSON' });
    } else {
        next();
    }
};

app.use(bodyParser.json());
app.use(jsonErrorHandler);
app.use(expressLogger);

app.get('/', (req, res) => {
    res.status(200).json({ status: 'Santed API' });
});

// Unhandled 500
app.use((error, req, res, next) => {
    console.log('Uncaught error: ', error);
    res.status(500).json({ status: 'Internal Server Error', code: '500' });
});

const port = process.env.PORT || config.server.port;
const server = app.listen(port, () => {
    console.log(`Santed API started on ${port}`);
});

module.exports = server;
