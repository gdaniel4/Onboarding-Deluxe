const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
////copied from CFC models

let residenceSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    clientID: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    county: {
        type: String,
        required: true
    },
    zip: {
        type: Number,
        required: true
    },
    totalRent: {
        type: Number
    },
    livingArrangemets: {
        type: String
    },
    hasUtilities: {
        type: String
    },
    isSubsidized: {
        type: String
    },
    isSingleParent: {
        type: String
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
        collection: 'residences'
    });

module.exports = mongoose.model('residence', residenceSchema)