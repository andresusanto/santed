const mongoose = require('mongoose');
const moment = require('moment');
const Miner = require('./miner').schema;

const Position = mongoose.Schema({
    license: String,
    num: Number,
});

const Assignment = mongoose.Schema({
    miner: Miner,
    position: String,
})

const Project = mongoose.Schema({
    id: String,
    name: String,
    type: String,
    description: String,
    site: String,
    startDate: Date,
    endDate: Date,
    requirements: [Position],
    assignments: [Assignment],
    cost: Number,
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'projects',
});

const columnParser = {
    "startDate": (item, head, res) => {
        res.startDate = moment(item).toDate();
    },
    "endDate": (item, head, res) => {
        res.endDate = moment(item).toDate();
    },
};

module.exports = {
    schema: Project,
    csvColumnParser: columnParser,
};
