const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let employmentSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    clientID: {
        type: String,
        required: true
    },
    employmentStatus: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    employer: {
        type: String
    },
    occupation: {
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
        collection: 'employments'
    }
);

module.exports = mongoose.model('employment', employmentSchema);

// Designation:
// 1. employmentStatus: String (Employed | Unemployed | Retired | Housewife)
// 2. length: Number (for Employed | Unemployed | Retired)
// 3. employer: String (for Employed)
// 4. occupation: String (for Employed)