const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//copied from CFC models
// worker that is assigned to a client
let workerSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    workerID: {
        type: String,
        default: uuid.v1
    },
    //ADDED: by group 13 SP22
    orgID: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
},

    {
        collection: 'workers'
    }
);

module.exports = mongoose.model('worker', workerSchema);