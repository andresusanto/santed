const mongoose = require('mongoose');

const License = mongoose.Schema({
    user: String,
    active: Boolean, // all true
    firstName: String,
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

module.exports = License;
