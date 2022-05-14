const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let contactSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    // Connects this schema to the client
    clientID: {
        type: String
    },
    // Only two options for num, not many people have home phones
    // Simpler to have just an option that can hold any type of
    // of phone number, can be cell or home even.
    cellNum: {
        type: String,
        required: true
    },
    otherNum: {
        type: String
    },
    personalEmail: {
        type: String,
        required: true
    },
    otherEmail: {
        type: String
    },
    maritalStatus: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true
    },
    priorityPopulation: {
        type: String,
        required: true
    },
    isPregnancy: {
        type: String,
        required: true
    },
    // Only available if 'isPregnancy' = true
    isTeenParent: {
        type: String,
        required: true
    },
    // Removed at first but kept now
    // Helpful for the business to understand
    // that when the client delivers, they will be unable to attend
    deliveryMonth: {
        type: Number
    },
    modifyAt: {
        type: Date
    }
},
    {
        timestamps: {
            createdAt: null,
            updatedAt: 'modifyAt',
            required: true
        }
    },
    {
        collection: 'contacts'
    });

module.exports = mongoose.model('contact', contactSchema)