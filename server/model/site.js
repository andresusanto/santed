const mongoose = require('mongoose');
const moment = require('moment');

const Site = mongoose.Schema({
    id: String,
    name: String,
    temperature: String,
    pressure: Number,
    danger: Boolean,
});

const columnParser = {
    'temperature': 'number',
    'pressure': 'number',
    'danger': (item) => {
        return item !== 0;
    },
};

module.exports = {
    schema: Site,
    csvColumnParser: columnParser,
};
