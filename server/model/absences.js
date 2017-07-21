const mongoose = require('mongoose');

const Absences = mongoose.Schema({
    id: String,
    name: String,
    age: Number,
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'absensces',
});

module.exports = TestSchema;
