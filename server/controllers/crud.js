const _ =  require('lodash');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('../logger');

const ObjectId = mongoose.Types.ObjectId;

const CRUD = (Model) => {
    const router = express.Router();

    const errorCallback = (res) => {
        return (err) => {
            logger.error('CRUD Error: ', err);
            return res.status(500).json({ error: err.message });
        };
    };

    router.get('/findById/:id', (req, res) => {
        let id;
        try {
            id = ObjectId(req.params.id);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
        Model.findOne({ _id: id })
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(errorCallback(res));
    });

    router.get('/find', (req, res) => {
        const query = Model.find(req.query).limit(100);
        query.exec()
            .then((data) => {
                return res.status(200).json(data);
            })
            .catch(errorCallback(res));
    });

    router.post('/', (req, res) => {
        const modelToSave = new Model(req.body);
        if (!modelToSave._id) {
            return modelToSave.save()
                .then((saved) => {
                    return res.status(200).json(saved);
                })
                .catch(errorCallback(res));
        }

        const options = {
            upsert: true,
            new: true,
        };
        Model.findByIdAndUpdate(modelToSave._id, modelToSave, options)
            .then((saved) => {
                return res.status(200).json(saved);
            })
            .catch(errorCallback(res));
    });

    router.delete('/deleteById/:id', (req, res) => {
        let id;
        try {
            id = ObjectId(req.params.id);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
        Model.remove({ _id: id })
            .then((removed) => {
                return res.status(200).json(removed);
            })
            .catch(errorCallback(res));
    });

    router.delete('/delete', (req, res) => {
        // prevents delete everything
        if (!req.query || Object.keys(req.query).length === 0) {
            return res.status(400).json({ error: 'At least one attribute should be present' });
        }
        if (_.some(req.query, (obj) => !obj)) {
            return res.status(400).json({ error: 'Empty attribute is not allowed' });
        }
        Model.remove(req.query)
            .then((removed) => {
                return res.status(200).json(removed);
            })
            .catch(errorCallback(res));
    })

    return router;
};

module.exports = CRUD;
