const mongoose = require('mongoose');
const moment = require('moment');
require('moment-timezone');

const License = mongoose.Schema({
    user: String,
    active: Boolean, // all true
    firstName: String,
    middleInitial: String,
    lastName: String,
    entityId: String,
    itemType: String, // all JOB_DUTY_CKLIST
    entityType: String, // all Item
    itemRevisionDate: Date,
    revisionNumber: Number,
    entityTitle: String,
    scheduledOfferingId: String, // all empty
    completionDate: Date,
    grade: String, // all empty
    completionStatusId: String, // all CHKLIST_COMPLETE
    completionStatus: String, // all Job Checklist Complete
    totalHours: Number,
    creditHours: Number,
    contactHours: Number,
    cpe: Number,
    tuition: Number,
    currencySymbol: String, // Z, $
    currencyId: String, // ZAR, USD
    instructor: String, // all empty
    lastUpdateUser: String,
    lastUpdateTime: Date,
    esigMeaningCode: String, // all empty
    comments: String, // all empty
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'licenses',
});

const extractTZ = (str) => {
    const matches = /(.*[A|P]M) (.*)/.exec(str);
    return moment(matches[1], 'M/D/YYYY h:m A').tz(matches[2]).toDate();
};

const columnParser = {
    "User": (item, head, res) => {
        res.user = item;
    },
    "Active User": (item, head, res) => {
        res.active = item === "Yes";
    },
    "First Name": (item, head, res) => {
        res.firstName = item;
    },
    "Last Name": (item, head, res) => {
        res.lastName = item;
    },
    "Middle Initial": (item, head, res) => {
        res.middleInitial = item;
    },
    "Entity ID": (item, head, res) => {
        res.entityId = item;
    },
    "Item Type": (item, head, res) => {
        res.itemType = item;
    },
    "Entity Type": (item, head, res) => {
        res.entityType = item;
    },
    "Item Revision Date": (item, head, res) => {
        res.itemRevisionDate = extractTZ(item);
    },
    "Revision Number": (item, head, res) => {
        res.revisionNumber = Number(item);
    },
    "Entity Title": (item, head, res) => {
        res.entityTitle = item;
    },
    "Scheduled Offering ID": (item, head, res) => {
        res.scheduledOfferingId = item;
    },
    "Completion Date": (item, head, res) => {
        res.completionDate = extractTZ(item);
    },
    "Grade": (item, head, res) => {
        res.grade = item;
    },
    "Completion Status ID": (item, head, res) => {
        res.completionStatusId = item;
    },
    "Completion Status": (item, head, res) => {
        res.completionStatus = item;
    },
    "Total Hours": (item, head, res) => {
        res.totalHours = Number(item);
    },
    "Credit Hours": (item, head, res) => {
        res.creditHours = Number(item);
    },
    "Contact Hours": (item, head, res) => {
        res.contactHours = Number(item);
    },
    "CPE": (item, head, res) => {
        res.cpe = Number(item);
    },
    "Tuition": (item, head, res) => {
        res.tuition = Number(item);
    },
    "Currency Symbol": (item, head, res) => {
        res.currencySymbol = item;
    },
    "Currency ID": (item, head, res) => {
        res.currencyId = item;
    },
    "Instructor": (item, head, res) => {
        res.instructor = item;
    },
    "Last Update User": (item, head, res) => {
        res.lastUpdateUser = item;
    },
    "Last Update Time": (item, head, res) => {
        res.lastUpdateTime = extractTZ(item);
    },
    "Esig Meaning Code": (item, head, res) => {
        res.esigMeaningCode = item;
    },
    "Comments": (item, head, res) => {
        res.comments = item;
    },
};

module.exports = {
    schema: License,
    csvColumnParser: columnParser,
};
