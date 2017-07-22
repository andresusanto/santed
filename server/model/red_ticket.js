const mongoose = require('mongoose');
const moment = require('moment');

const RedTicket = mongoose.Schema({
    companyNo: String,
    name: String, // original: Name & Surname
    businessUnit: String,
    position: String,
    medicalDate: Date,
    outcome: String,
    comment: String,
    toReturnDate: String,
    required: Boolean, // all Red Ticket (Required)
    expiryDate: Date,
});

const columnParser = {
    "Company No": (item, head, res) => {
        res.companyNo = item;
    },
    "Name & Surname": (item, head, res) => {
        res.name = item;
    },
    "Business Unit": (item, head, res) => {
        res.businessUnit = item;
    },
    "Position": (item, head, res) => {
        res.position = item;
    },
    "Medical Date": (item, head, res) => {
        res.medicalDate = moment(item, 'MM/DD/YY').toDate();
    },
    "Outcome": (item, head, res) => {
        res.outcome = item;
    },
    "Comment": (item, head, res) => {
        res.comment = item;
    },
    "To Return Date": (item, head, res) => {
        res.toReturnDate = item;
    },
    "Red Ticket Required/Not": (item, head, res) => {
        res.required = item.indexOf('(Required)') !== -1;
    },
    "Expiry Date": (item, head, res) => {
        res.expiryDate = moment(item, 'MM/DD/YY').toDate();
        if (res.expiryDate == "Invalid Date") {
            res.expiryDate = moment('01/01/9999', 'MM/DD/YYYY').toDate();
        }
    },
};

module.exports = {
    schema: RedTicket,
    csvColumnParser: columnParser,
};
