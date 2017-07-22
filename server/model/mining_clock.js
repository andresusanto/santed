const mongoose = require('mongoose');
const moment = require('moment');

const MiningClock = mongoose.Schema({
    cardNumber: String,
    layoutId: String, // all 2, can be Number
    transitDate: Date,
    transitStatusId: String, // original: TRANSIT_STATUS. can be Number
    transitStatus: String, // original: STR_TRANSIT_STATUS
    sbiType: String,
    sbiId: String,
    firstName: String, // original: NAME
    lastName: String, // original: SURNAME
    identifier: String,
    zone: String,
    terminal: String,
    reason: String, // all 00000
    accessControlType: String, // all 1
    timeAttendanceType: String, // all 0/1
    canteenType: String, // all 0
    sapType: String, // all 0
    strTransitType: String,
    directionId: String, // original: DIRECTION, 1: Entry, 0: Exit
    direction: String, // original: STR_DIRECTION
    userType: String,
    visitorCompany: String,
    parameter1: String,
    parameter2: String,
    parameter3: String,
    parameter4: String,
    parameter5: String,
    granted: Boolean, // all 0/1, assumed to be Boolean
    supervised: Boolean, // all 0, assumed to be Boolean,
    siteId: String, // original: SITE
    siteAcronym: String,
    site: String, // Sheet name
    insertDate: Date,
    locationTagName: String, // all $ORGANIZATIONMODEL
    locationFullName: String, // all /Organizations
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'mining_clocks',
});

const columnParser = {
    "CARD_NUMBER": (item, head, res) => {
        res.cardNumber = item;
    },
    "LAYOUT_ID": (item, head, res) => {
        res.layoutId = item;
    },
    "TRANSIT_DATE": (item, head, res) => {
        res.transitDate = moment(item).toDate(); // "2017-04-05 00:13:37.000",
    },
    "TRANSIT_STATUS": (item, head, res) => {
        res.transitStatusId = item;
    },
    "STR_TRANSIT_STATUS": (item, head, res) => {
        res.transitStatus = item;
    },
    "SBI_TYPE": (item, head, res) => {
        res.sbiType = item;
    },
    "SBI_ID": (item, head, res) => {
        res.sbiId = item;
    },
    "SURNAME": (item, head, res) => {
        res.lastName = item;
    },
    "NAME": (item, head, res) => {
        res.firstName = item;
    },
    "IDENTIFIER": (item, head, res) => {
        res.identifier = item;
    },
    "ZONE": (item, head, res) => {
        res.zone = item;
    },
    "TERMINAL": (item, head, res) => {
        res.terminal = item;
    },
    "REASON": (item, head, res) => {
        res.reason = item;
    },
    "ACCESS_CONTROL_TYPE": (item, head, res) => {
        res.accessControlType = item;
    },
    "TIME_ATTENDANCE_TYPE": (item, head, res) => {
        res.timeAttendanceType = item;
    },
    "CANTEEN_TYPE": (item, head, res) => {
        res.canteenType = item;
    },
    "SAP_TYPE": (item, head, res) => {
        res.sapType = item;
    },
    "STR_TRANSIT_TYPE": (item, head, res) => {
        res.strTransitType = item;
    },
    "DIRECTION": (item, head, res) => {
        res.directionId = item;
    },
    "STR_DIRECTION": (item, head, res) => {
        res.direction = item;
    },
    "USER_TYPE": (item, head, res) => {
        res.userType = item;
    },
    "VISITOR_COMPANY": (item, head, res) => {
        res.visitorCompany = item;
    },
    "PARAMETER_1": (item, head, res) => {
        res.parameter1 = item;
    },
    "PARAMETER_2": (item, head, res) => {
        res.parameter2 = item;
    },
    "PARAMETER_3": (item, head, res) => {
        res.parameter3 = item;
    },
    "PARAMETER_4": (item, head, res) => {
        res.parameter4 = item;
    },
    "PARAMETER_5": (item, head, res) => {
        res.parameter5 = item;
    },
    "GRANTED": (item, head, res) => {
        res.granted = item === "1";
    },
    "SUPERVISED": (item, head, res) => {
        res.supervised = item === "1";
    },
    "SITE": (item, head, res) => {
        res.siteId = item;
    },
    "SITE_ACRONYM": (item, head, res) => {
        res.siteAcronym = item;
    },
    "INSERT_DATE": (item, head, res) => {
        res.insertDate = moment(item).toDate(); // "2017-04-05 00:13:45.100",
    },
    "LocationTagName": (item, head, res) => {
        res.locationTagName = item;
    },
    "LocationFullName": (item, head, res) => {
        res.locationFullName = item;
    },
};

module.exports = {
    schema: MiningClock,
    csvColumnParser: columnParser,
};
