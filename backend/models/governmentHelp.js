const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 'govermentHelp' schema to contain the whole list
// of help that the client may be provided by the govenment
// Helpful for our solution to keep it seprate
// easier to view and store
let governmentHelpSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    clientID: {
        type: String
    },
    tanf: {
        type: String
    },
    ssi: {
        type: Number
    },
    unemployment: {
        type: String
    },
    socialSecurity: {
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
        collection: 'governmentHelp'
    }
);

module.exports = mongoose.model('governmentHelp', governmentHelpSchema);

// Designation:
// 1. employmentStatus: String (Employed | Unemployed | Retired | Housewife)
// 2. length: Number (for Employed | Unemployed | Retired)
// 3. employer: String (for Employed)
// 4. occupation: String (for Employed)