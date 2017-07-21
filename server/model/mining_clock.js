const mongoose = require('mongoose');

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
    // skipped parameter 1-5
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

module.exports = MiningClock;
