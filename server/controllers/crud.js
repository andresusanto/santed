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
        Model.find(req.query)
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
        const id = req.params.id;
        Model.remove({ _id: id }, (err, data) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(200).json(data);
        });
    });

    return router;
};

module.exports = CRUD;
