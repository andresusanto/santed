const mongoose = require('mongoose');

const Workschedule = mongoose.Schema({
    persNo: String,
    pa: String,
    planned: Number,
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

module.exports = Workschedule;
