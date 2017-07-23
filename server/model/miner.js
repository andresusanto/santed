const mongoose = require('mongoose');
const moment = require('moment');

const Miner = mongoose.Schema({
    persNo: String,
    firstName: String,
    lastName: String,
    employeeGroup: String,
    employeeSubgroup: String,
    positionId: String, // original: Position
    position: String, // original: Position2
    orgUnitId: String,
    orgUnit: String,
    superior: String, // Name of superior (OM)
    totalAbsHours: Number,
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'miners',
});

const columnParser = {
    "Pers.no.": (item, head, res) => {
        res.persNo = item;
    },
    "Last name": (item, head, res) => {
        res.lastName = item;
    },
    "First name": (item, head, res) => {
        res.firstName = item;
    },
    "Employee Group": (item, head, res) => {
        res.employeeGroup = item;
    },
    "Employee Subgroup": (item, head, res) => {
        res.employeeSubgroup = item;
    },
    "Position": (item, head, res) => {
        res.positionId = item;
    },
    "Position2": (item, head, res) => {
        res.position = item;
    },
    "Org.unit": (item, head, res) => {
        res.orgUnitId = item;
    },
    "Organizational Unit": (item, head, res) => {
        res.orgUnit = item;
    },
    "Name of superior (OM)": (item, head, res) => {
        res.superior = item;
    },
    "Tot. abs.hrs": (item, head, res) => {
        res.totalAbsHours = Number(item);
    },
};

module.exports = {
    schema: Miner,
    csvColumnParser: columnParser,
};
