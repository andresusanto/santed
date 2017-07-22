const express = require('express');
const mongoose = require('mongoose');
const csv = require('csvtojson');
const { ReadableStreamBuffer } = require('stream-buffers');

const ObjectId = mongoose.Types.ObjectId;

const CSVController = (Model, ColumnParser) => {
    const router = express.Router();

    const errorCallback = (res) => {
        return (err) => {
            return res.status(500).json({ error: err.message });
        };
    };

    router.post('/importCsv', (req, res) => {
        // console.log(req.files);
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'File not found' });
        }
        const file = req.files.file;
        const stream = new ReadableStreamBuffer();
        stream.put(file.data);
        stream.stop();
        const csvOptions = {
            delimiter: 'auto',
            flatKeys: true,
            // colParser: ColumnParser,
        };
        if (ColumnParser) {
            csvOptions.colParser = ColumnParser;
        }
        csv(csvOptions)
            .fromStream(stream)
            .on('end_parsed', (data) => {
                if (!ColumnParser || ColumnParser.debug) {
                    return res.status(200).json(data);
                }

                Model.create(data)
                    .then((saved) => {
                        return res.status(200).json(saved);
                    })
                    .catch(errorCallback(res));
            });
    });

    return router;
};

module.exports = CSVController;
