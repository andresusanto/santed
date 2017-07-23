'use strict';

const _ = require('lodash');
const express = require('express');
const expressFileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const config = require('./config');
const logger = require('./logger');
const CRUD = require('./controllers/crud');
const CSV = require('./controllers/csv');
const TestSchema = require('./model/test');
const models = require('./model');

mongoose.Promise = Promise;

const app = express();

const expressLogger = (req, res, next) => {
    logger.info(`[REQUEST LOGGER] ${req.method} ${req.url} with request header ${JSON.stringify(req.headers)} and body ${JSON.stringify(req.body)}`);
    next();
};

const jsonErrorHandler = (error, req, res, next) => {
    if (error instanceof SyntaxError) {
        res.status(400).json({ status: 'Bad Request', code: '400', message: 'Invalid JSON' });
    } else {
        next();
    }
};

const cors = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

app.use(cors);
app.use(bodyParser.json());
app.use(jsonErrorHandler);
app.use(expressLogger);
app.use(expressFileUpload());

app.get('/', (req, res) => {
    res.status(200).json({ status: 'Santed API v11:07' });
});

// Unhandled 500
app.use((error, req, res, next) => {
    logger.error('Uncaught error: ', error);
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
        logger.info('Connected to mongodb!');

        _.some(models, (m, name) => {
            const Model = db.model(name, m.schema);
            app.use(`/${_.snakeCase(name)}`, CRUD(Model));
            app.use(`/${_.snakeCase(name)}`, CSV(Model, m.csvColumnParser));
            m.model = Model;

            return false;
        });

        // const License = models.License.model;
        // const MiningClock = models.MiningClock.model;

        // let promises = [];
        // promises.push(License.find().limit(1000).exec());
        // promises.push(MiningClock.find().limit(1000).exec());
        // Promise.all(promises)
        //     .then((results) => {
        //         const licenses = results[0];
        //         const miningClocks = results[1];
        //         const firstnames = {}, lastnames = {};
        //         _.some(licenses, (l) => {
        //             if (!l.firstName) {
        //                 console.log(l);
        //                 return false
        //             }
        //             firstnames[l.firstName.toLowerCase()] = true;
        //             lastnames[l.lastName.toLowerCase()] = true;
        //             return false;
        //         });
        //         console.log('FirstName:', _.some(miningClocks, (m) => {
        //             if (firstnames[m.firstName.toLowerCase()]) {
        //                 console.log(m);
        //                 return true;
        //             }
        //             return false;
        //         }));
        //         console.log('LastName:', _.some(miningClocks, (m) => {
        //             return lastnames[m.lastName.toLowerCase()];
        //         }));
        //     })
        //     .catch((err) => {
        //         logger.error(err);
        //     });

        // const TestModel = db.model('Test', models.Test.schema);
        // app.use('/test', CRUD(TestModel));

        // const LeaveModel = db.model('Leave', models.Leave.schema);
        // app.use('/leave', CRUD(LeaveModel, models.Leave.csvColumnParser));

        // const LicenseModel = db.model('License', models.License.schema);
        // app.use('/leave', CRUD(LeaveModel, models.Leave.csvColumnParser));

        

        const port = process.env.PORT || config.server.port;
        const server = app.listen(port, () => {
            logger.info(`Santed API started on ${port}`);
        });
    } catch (e) {
        logger.error('Error while initializing: ', e);
    }
};

init();
