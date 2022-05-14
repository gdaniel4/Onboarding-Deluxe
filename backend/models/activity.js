const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Models ported over from CFC solution
// Mostly the same, certain things have been adjusted
// to suit our solution, they will be explained

let activitySchema = new Schema({
    // identifier
    _id: {
        type: String,
        default: uuid.v1
    },
    activityID: {
        type: String,
        default: uuid.v1
    },
    program: {
        type: String,
        required: true
    },
    shortNotes: {
        type: String
    },
    attending: {
        type: Array
    },
    datetime: {
        type: Date,
        required: true
    },
    timeSpend: {
        type: Number,
        required: true
    },
    workerID: {
        type: String,
        required: true
    },
    handlingStatus: {
        type: String
    }
},
    {
        collection: 'activities'
    });
    
module.exports = mongoose.model('activity', activitySchema)