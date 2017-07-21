const mongoose = require('mongoose');

const TestSchema = mongoose.Schema({
    id: String,
    name: String,
    age: Number,
}, {
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated',
    },
    collection: 'tests',
});

module.exports = TestSchema;
