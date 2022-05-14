const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//copied from CFC models

let incomeSchema = new Schema({
    _id: { 
		type: String, 
        default: uuid.v1 
	},
	clientID: {
		type: String
	},
    isHeadOfHousehold: {
        type: String
    },
    //next fields are used to see how much income the client gets from employment and childsupport
    //moved most of the other fields that were here to Governemt help
    monthlyIncome: {
        type: Number
    },
    workComp:{ 
        type: Number
    },
    childSupport:{ 
        type: Number
    },
    //all eccompassing fields that includes all other income
    otherIncome: { 
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
        collection: 'incomes'
});

module.exports = mongoose.model('income', incomeSchema)