const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//copied from CFC models

let healthSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    //this is what connects it to other schemas
    clientID: {
		type: String
    },
    hasHealthInsurance: {
        type: String
    },
    healthInsuranceProgram: {
        type: String
    },
    hasFoodStamps: {
        type: String
    },
    foodStampsAmount: {
        type: Number
    },
    foodStampsReason: {
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
        collection: 'healths'
    });

module.exports = mongoose.model('health', healthSchema);