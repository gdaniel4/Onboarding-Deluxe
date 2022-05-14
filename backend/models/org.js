const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let orgSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    orgID: {
        type: String,
        default: uuid.v1
    },
    orgName: {
        type: String,
        required: true
    //ADD A FIELD THAT COUNTS THE NUBMER OF CLIENTS IN AN ORG
    },
    clients: {
        type: Array
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
        collection: 'orgs'
    });

module.exports = mongoose.model('org', orgSchema);
