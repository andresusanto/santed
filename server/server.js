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
const { scheduleProject, rescheduleProject } = require('./scheduling/project');

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

        const Project = models.Project.model;
        app.post('/project/create', (req, res) => {
            const spec = req.body;
            spec.name = spec.name || spec.projectName;
            spec.type = spec.type || spec.projectType;
            spec.description = spec.description || spec.projectDescription;
            spec.site = spec.site || spec.projectLocation;
            spec.requirements = _.map(spec.criticalPositions, (num, pos) => {
                return {
                    license: pos,
                    num: num,
                };
            });
            if (spec.additionalCrewMax) {
                spec.requirements.push({
                    license: false,
                    num: spec.additionalCrewMax,
                });
            }
            const project = new Project(spec);
            project.save()
                .then((saved) => {
                    return scheduleProject(spec, models)
                        .then((result) => {
                            saved.requirements = result.requirements;
                            saved.assignments = result.assignments;
                            saved.cost = result.cost;
                            return saved.save()
                                .then((updated) => {
                                    return res.status(200).json(updated);
                                });
                        });
                })
                .catch((err) => {
                    logger.error('Error while scheduling:', err);
                    res.status(500).json({ error: err.message });
                });
        });

        app.get('/project/findByMiner', (req, res) => {
            const query = {};
            if (req.query.persNo) {
                query['assignments.miner.persNo'] = req.query.persNo;
            }
            if (req.query.firstName) {
                query['assignments.miner.firstName'] = req.query.firstName;
            }
            if (req.query.lastName) {
                query['assignments.miner.lastName'] = req.query.lastName;
            }
            Project.find(query)
                .then((projects) => {
                    const flaggedProjects = _.map(projects, (project) => {
                        const assignment = _.find(project.assignments, (a) => {
                            return (a.miner.persNo === req.query.persNo
                                || a.miner.firstName === req.query.firstName
                                || a.miner.lastName === req.query.lastName);
                        });
                        return _.defaults(project.toJSON(), { status: assignment.status });
                    })
                    res.status(200).json(flaggedProjects);
                })
                .catch((err) => {
                    logger.error('Error at /project/findByMiner:', err);
                    res.status(500).json({ error: err.message });
                });
        });
        
        app.post('/project/accept', (req, res) => {
            const projectId = req.body._id || req.body.id;
            const persNo = req.body.persNo;
            Project.findOne({
                _id: projectId,
                'assignments.miner.persNo': persNo,
            }).then((project) => {
                    if (!project) {
                        return res.status(400).json({ error: 'project not found '});
                    }

                    _.some(project.assignments, (assignment) => {
                        if (assignment.miner.persNo === persNo) {
                            assignment.status = 'Accepted';
                        }
                    });

                    project.save()
                        .then((saved) => {
                            return res.status(200).json(saved);
                        });
                })
                .catch((err) => {
                    logger.error('Error at /project/accept:', err);
                    res.status(500).json({ error: err.message });
                });
        });

        app.post('/project/reject', (req, res) => {
            const projectId = req.body._id || req.body.id;
            const persNo = req.body.persNo;
            Project.findOne({
                _id: projectId,
                'assignments.miner.persNo': persNo,
            }).then((project) => {
                    if (!project) {
                        return res.status(400).json({ error: 'project not found '});
                    }

                    if (project.rejected.indexOf(persNo) === -1) {
                        project.rejected.push(persNo);
                    }
                    // 
                    return rescheduleProject(project, models)
                        .then((result) => {
                            project.requirements = result.requirements;
                            project.assignments = result.assignments;
                            project.cost = result.cost;
                            return project.save()
                                .then((updated) => {
                                    return res.status(200).json(updated);
                                });
                        });
                })
                .catch((err) => {
                    logger.error('Error at /project/accept:', err);
                    res.status(500).json({ error: err.message });
                });
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
