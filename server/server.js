'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config');
const CRUD = require('./controllers/crud');
const TestSchema = require('./model/test');

mongoose.Promise = Promise;

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


async function init() {
    try {
        // Initialize mongoose
        const mongooseOptions = {
            useMongoClient: true,
        }
        const url = `mongodb://${encodeURIComponent(config.mongodb.user)}:${encodeURIComponent(config.mongodb.pass)}@${config.mongodb.url}`;
        const db = await mongoose.createConnection(url, mongooseOptions);
        console.log('Connected to mongodb!');

        const TestModel = db.model('Test', TestSchema);
        app.use('/test', CRUD(TestModel));

        const port = process.env.PORT || config.server.port;
        const server = app.listen(port, () => {
            console.log(`Santed API started on ${port}`);
        });
    } catch (e) {
        console.log('Error: ', e);
    }
};

init();
