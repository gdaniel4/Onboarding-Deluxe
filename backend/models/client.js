const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let clientSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    // Connect this schema to the others
    clientID: {
        type: String,
        default: uuid.v1
    },
    lastName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleInitial: {
        type: String
    },
    orgID: {
        type: String
    },
    events: {
        type: Array
    },
    activities: {
        type: Array
    },
    birthday: {
        type: String,
        required: true
    },
    ssn: {
        type: String
    },
    //CHECK LINE 35 OF EditComponent.vue FOR MORE INFO ABOUT CONVERTING THIS (AND OTHER FIELDS)
    //--BACK INTO BOOLEAN
    isVeteran: {
        type: String
    },
    is65orOlder: {
        type: String
    },
    isVaccinated: {
        type: String
    },
    gender: {
        type: String
    },
    driverLicense: {
        type: String,
        required: true       
    },
    //Residence
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
    livingArrangements: {
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
    //Contact
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
    //Education
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
    //Employment
    employmentStatus: {
        type: String,
        required: true
    },
    lengthOfEmployment: {
        type: Number,
        required: true
    },
    employer: {
        type: String
    },
    occupation: {
        type: String
    },
    //Gov Help
    tanf: {
        type: String
    },
    ssi: {
        type: String
    },
    unemployment: {
        type: String
    },
    socialSecurity: {
        type: String
    },
    //health
    hasHealthInsurance: {
        type: String
    },
    healthInsuranceProgram: {
        type: String
    },
    isPregnancy: {
        type: String,
        required: true
    },
    isTeenParent: {
        type: String
    },
    // Removed at first but kept now
    // Helpful for the business to understand
    // that when the client delivers, they will be unable to attend
    deliveryMonth: {
        type: String
    },
    //Income
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
    hasFoodStamps: {
        type: String
    },
    foodStampsAmount: {
        type: Number
    },
    foodStampsReason: {
        type: String
    },
    //all eccompassing fields that includes all other income
    otherIncome: { 
        type: Number
    },
    modifyAt: {
        type: Date
        //required: true
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
        collection: 'clients'
    });

module.exports = mongoose.model('client', clientSchema)