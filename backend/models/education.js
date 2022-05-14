const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let educationSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    // Connects this schema to the client
    clientID: {
        type: String
    },
    hasAttended: {
        type: String,
        required: true
    },
    school: {
        type: String
    },
    // Letter grade is an average of all classes, taken prior.
    lastGrade: {
        type: String
    },
    hasGraduated: {
        type: String,
        required: true
    },
    attendingAttendedCollege: {
        type: String
    },
    certifications: {
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
        collection: 'educations'
    }
);

module.exports = mongoose.model('education', educationSchema);