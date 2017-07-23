const mongoose = require('mongoose');
const moment = require('moment');

const Workschedule = mongoose.Schema({
    persNo: String,
    pa: String,
    planned: Number,
    pws: String,
    wsRuleId: String, // original: WS rule
    wsRule: String, // original: Work Schedule Rule
    employmentStatus: String, // all Active
    companyCode: String, // all Sasol Mining
    startDate: Date,
    endDate: Date, // all 12/31/9999
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'workschedules',
});

const columnParser = {
    debug: true,
    "Pers.no.": (item, head, res) => {
        res.persNo = item;
    },
    "PA": (item, head, res) => {
        res.pa = item;
    },
    "Planned": (item, head, res) => {
        res.planned = Number(item);
    },
    "PWS": (item, head, res) => {
        res.pws = item;
    },
    "WS rule": (item, head, res) => {
        res.wsRuleId = item;
    },
    "Work Schedule Rule": (item, head, res) => {
        res.wsRule = item;
    },
    "Employment Status": (item, head, res) => {
        res.employmentStatus = item;
    },
    "Company Code": (item, head, res) => {
        res.companyCode = item;
    },
    "Start date": (item, head, res) => {
        res.startDate = moment(item, 'MM/DD/YYYY');
    },
    "End date": (item, head, res) => {
        res.endDate = moment(item, 'MM/DD/YYYY');
    },
};

module.exports = {
    schema: Workschedule,
    csvColumnParser: columnParser,
};
