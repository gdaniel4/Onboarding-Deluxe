const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//copied from CFC models

let familySchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    clientID: {
        type: String
    },
    familyMember: [{
        lastName: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        birthday: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        relation: {
            type: String,
            required: true
        },
        race: {
            type: String,
            required: true
        },
        pregnant: {
            type: String,
            required: true
        },
        whereWorkOrStudy: {
            type: String,
            required: true
        },
        occupationOrGrade: {
            type: String,
            required: true
        }
    }]
},
    {
        collection: 'families'
    });

    module.exports = mongoose.model('family', familySchema)