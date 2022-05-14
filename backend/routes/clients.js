const express = require("express");
const router = express.Router()
const ClientModel = require('../models/client');
const OrgModel = require('../models/org');




// POST(CREATE): an endpoint that will insert client info into a DB.
router.post('/', (req, res, next) => {

    ClientModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client info is added to the database.');
        }
    });
});



// PUT(Update): an endpoint to edit a client record by clientid.
/*
router.put('/:id', (req, res, next) => {
//{ $set: req.body}
    ClientModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client is edited via PUT.');
            console.log('Client successfully updated!', data)
        }
    })
});
*/
router.put('/:id', (req, res, next) => {
    console.log(req.body)
    ClientModel.findOneAndUpdate({ clientID: req.params.id }, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.send('Client is edited via PUT');
          console.log('Client successfully updated!', data)
        }
      })
});


// PUT(Update): an endpoint to edit client record by clientid.
router.put('/update/events/:clientID/:eventID', (req, res) => {
    ClientModel.findOneAndUpdate({ clientID: req.params.clientID}, { $push: {events: req.params.eventID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event has been added to client.');
        }
    });
});

router.put('/remove/events/:clientID/:eventID', (req, res) => {
    ClientModel.findOneAndUpdate({ clientID: req.params.clientID}, { $pull: {events: req.params.eventID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event has been removed from client.');
        }
    });
});

// PUT(Update): an endpoint to edit client record by clientid.
router.put('/update/activities/:clientID/:activityID', (req, res) => {
    ClientModel.findOneAndUpdate({ clientID: req.params.clientID}, { $push: {activities: req.params.activityID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Activity has been added to client.');
        }
    });
});

router.put('/remove/activities/:clientID/:activityID', (req, res) => {
    ClientModel.findOneAndUpdate({ clientID: req.params.clientID}, { $pull: {activities: req.params.activityID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Activity has been removed from client.');
        }
    });
});

//Fix this
router.put('/update/org', (req, res) => {
    ClientModel.findOneAndUpdate({ clientID: req.body.clientID}, {orgID: req.body.orgID }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Organization has been assigned to client.');
        }
    });
});

/*
router.put('/remove/org', (req, res) => {
    ClientModel.findOneAndUpdate({ clientID: req.body.clientID}, {orgID: req.body.orgID }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Organization has been removed from client.');
        }
    });
});
*/

/*
// GET(READ): an endpoint to get all clients from the API.
router.get('/', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    ClientModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
    {
        $group:     // Group by client ID and only return the latest documents for each client.
        {
            _id: "$clientID",
            latest: { $last: "$$ROOT" }
        }
    }], (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ _id: 1 });
});
*/

//Aggregate of all client info plus org
router.get('/client/sum/', (req, res, next) => {
    
    ClientModel.aggregate([
        {
            // JOIN ORG COLLECTION.
            $lookup: {
                from: OrgModel.collection.name,
                as: "orgInfo",
                let: { "orgID": "$orgID" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$$orgID", "$orgID"] } } },
                    { "$sort": { "modifyAt": -1 } },
                    { "$limit": 1 }
                ]
            }
        }, { $unwind: "$orgInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                clientID: 1,
                lastName: 1,
                firstName: 1,
                middleInitial: 1,
                orgID: "$orgInfo.orgID",
                orgName: "$orgInfo.orgName",
                events: 1,
                activities: 1,
                birthday: 1,
                ssn: 1,
                isVeteran: 1,
                is65orOlder: 1,
                isVaccinated: 1,
                gender: 1,
                driverLicense: 1,
                address: 1,
                city: 1,
                state: 1,
                county: 1,
                zip: 1,
                totalRent: 1,
                livingArrangemets: 1,
                hasUtilities: 1,
                isSubsidized: 1,
                isSingleParent: 1,
                //Contact
                cellNum: 1,
                otherNum: 1,
                personalEmail: 1,
                otherEmail: 1,
                maritalStatus: 1,
                language: 1,
                ethnicity: 1,
                //Education
                hasAttended: 1,
                school: 1,
                // Letter grade is an average of all classes, taken prior.
                lastGrade: 1,
                hasGraduated: 1,
                attendingAttendedCollege: 1,
                certifications: 1,
                //Employment
                employmentStatus: 1,
                lengthOfEmployment: 1,
                employer: 1,
                occupation: 1,
                //Gov Help
                tanf: 1,
                ssi: 1,
                unemployment: 1,
                socialSecurity: 1,
                //health
                hasHealthInsurance: 1,
                healthInsuranceProgram: 1,
                isPregnancy: 1,
                // Only available if 'isPregnancy' = true
                isTeenParent: 1,
                // Removed at first but kept now
                // Helpful for the business to understand
                // that when the client delivers, they will be unable to attend
                deliveryMonth: 1,
                //Income
                isHeadOfHousehold: 1,
                //next fields are used to see how much income the client gets from employment and childsupport
                //moved most of the other fields that were here to Governemt help
                monthlyIncome: 1,
                workComp: 1,
                childSupport: 1,
                hasFoodStamps: 1,
                foodStampsAmount: 1,
                foodStampsReason: 1,
                //all eccompassing fields that includes all other income
                otherIncome: 1,
                modifyAt: 1,
                testArray: 1
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// GET(READ): endpoint to combine client first name and last name
//https://www.mongodb.com/docs/manual/reference/operator/aggregation/concat/
router.get('/client/sum/firstlast', (req, res, next) => {
    
    ClientModel.aggregate([ 
        {
            // JOIN ORG COLLECTION.
            $lookup: {
                from: OrgModel.collection.name,
                as: "orgInfo",
                let: { "orgID": "$orgID" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$$orgID", "$orgID"] } } },
                    { "$sort": { "modifyAt": -1 } },
                    { "$limit": 1 }
                ]
            }
        }, { $unwind: "$orgInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                clientID: 1,
                firstLast: { $concat: [ "$firstName", " ", "$lastName" ] },
                lastName: 1,
                firstName: 1,
                middleInitial: 1,
                orgName: "$orgInfo.orgName",
                events: 1,
                activities: 1,
                birthday: 1,
                ssn: 1,
                isVeteran: 1,
                is65orOlder: 1,
                isVaccinated: 1,
                gender: 1,
                driverLicense: 1,
                address: 1,
                city: 1,
                state: 1,
                county: 1,
                zip: 1,
                totalRent: 1,
                livingArrangemets: 1,
                hasUtilities: 1,
                isSubsidized: 1,
                isSingleParent: 1,
                //Contact
                cellNum: 1,
                otherNum: 1,
                personalEmail: 1,
                otherEmail: 1,
                maritalStatus: 1,
                language: 1,
                ethnicity: 1,
                //Education
                hasAttended: 1,
                school: 1,
                // Letter grade is an average of all classes, taken prior.
                lastGrade: 1,
                hasGraduated: 1,
                attendingAttendedCollege: 1,
                certifications: 1,
                //Employment
                employmentStatus: 1,
                lengthOfEmployment: 1,
                employer: 1,
                occupation: 1,
                //Gov Help
                tanf: 1,
                ssi: 1,
                unemployment: 1,
                socialSecurity: 1,
                //health
                hasHealthInsurance: 1,
                healthInsuranceProgram: 1,
                isPregnancy: 1,
                // Only available if 'isPregnancy' = true
                isTeenParent: 1,
                // Removed at first but kept now
                // Helpful for the business to understand
                // that when the client delivers, they will be unable to attend
                deliveryMonth: 1,
                //Income
                isHeadOfHousehold: 1,
                //next fields are used to see how much income the client gets from employment and childsupport
                //moved most of the other fields that were here to Governemt help
                monthlyIncome: 1,
                workComp: 1,
                childSupport: 1,
                hasFoodStamps: 1,
                foodStampsAmount: 1,
                foodStampsReason: 1,
                //all eccompassing fields that includes all other income
                otherIncome: 1,
                modifyAt: 1,
                testArray: 1
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

router.get('/client/sum/:id', (req, res, next) => {
    
    ClientModel.aggregate([ { $match: { clientID: req.params.id } },
        {
            // JOIN ORG COLLECTION.
            $lookup: {
                from: OrgModel.collection.name,
                as: "orgInfo",
                let: { "orgID": "$orgID" },
                pipeline: [
                    { "$match": { "$expr": { "$eq": ["$$orgID", "$orgID"] } } },
                    { "$sort": { "modifyAt": -1 } },
                    { "$limit": 1 }
                ]
            }
        }, { $unwind: "$orgInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                clientID: 1,
                lastName: 1,
                firstName: 1,
                middleInitial: 1,
                orgID: "$orgInfo.orgID",
                orgName: "$orgInfo.orgName",
                events: 1,
                activities: 1,
                birthday: 1,
                ssn: 1,
                isVeteran: 1,
                is65orOlder: 1,
                isVaccinated: 1,
                gender: 1,
                driverLicense: 1,
                address: 1,
                city: 1,
                state: 1,
                county: 1,
                zip: 1,
                totalRent: 1,
                livingArrangemets: 1,
                hasUtilities: 1,
                isSubsidized: 1,
                isSingleParent: 1,
                //Contact
                cellNum: 1,
                otherNum: 1,
                personalEmail: 1,
                otherEmail: 1,
                maritalStatus: 1,
                language: 1,
                ethnicity: 1,
                //Education
                hasAttended: 1,
                school: 1,
                // Letter grade is an average of all classes, taken prior.
                lastGrade: 1,
                hasGraduated: 1,
                attendingAttendedCollege: 1,
                certifications: 1,
                //Employment
                employmentStatus: 1,
                lengthOfEmployment: 1,
                employer: 1,
                occupation: 1,
                //Gov Help
                tanf: 1,
                ssi: 1,
                unemployment: 1,
                socialSecurity: 1,
                //health
                hasHealthInsurance: 1,
                healthInsuranceProgram: 1,
                isPregnancy: 1,
                // Only available if 'isPregnancy' = true
                isTeenParent: 1,
                // Removed at first but kept now
                // Helpful for the business to understand
                // that when the client delivers, they will be unable to attend
                deliveryMonth: 1,
                //Income
                isHeadOfHousehold: 1,
                //next fields are used to see how much income the client gets from employment and childsupport
                //moved most of the other fields that were here to Governemt help
                monthlyIncome: 1,
                workComp: 1,
                childSupport: 1,
                hasFoodStamps: 1,
                foodStampsAmount: 1,
                foodStampsReason: 1,
                //all eccompassing fields that includes all other income
                otherIncome: 1,
                modifyAt: 1,
                testArray: 1
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// GET(READ): an endpoint to get all clients from the API.
router.get('/', (req, res, next) => {

    ClientModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// GET(READ): an endpoint to retrieve specific client by client ID.
router.get('/recent/one', (req, res, next) => {

    ClientModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);     // Only return the latest document
});


// GET(READ): an endpoint to retrieve client by client last name.
router.get('/lastname/:lastName', (req, res, next) => {

    // Finding document based on client last name.
    ClientModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
        { $group: { _id: "$clientID", latest: { $last: "$$ROOT" } } },
        { $match: { "latest.lastName": req.params.lastName } }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client not found');
        }
        else {
            res.json(data);
        }
    }).sort({ _id: 1 });
});

// GET(READ): an endpoint to retrieve client by that participate in the specified activity by their activityID.
router.get('/activity/:activityID', (req, res, next) => {

    // Finding document based on activity id.
    ClientModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
        { $group: { clientID: "$clientID", latest: { $last: "$$ROOT" } } },
        { $match: { "activities": req.params.activityID } }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client not found');
        }
        else {
            res.json(data);
        }
    }).sort({ clientID: 1 });
});

// GET(READ): an endpoint to retrieve client by that participate in the specified event by their eventID.
router.get('/event/:eventID', (req, res, next) => {

    // Finding document based on event id.
    ClientModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
        { $group: { _id: "$clientID", latest: { $last: "$$ROOT" } } },
        { $match: { "latest.eventID": req.params.eventID } }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client not found');
        }
        else {
            res.json(data);
        }
    }).sort({ _id: 1 });
});

// GET(READ): an endpoint to get all clients edit history from the API.
router.get('/history/:id', (req, res, next) => {

    ClientModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});


// DELETE: an endpoint to delete a client by client ID and modify time.
router.delete('/:id', (req, res, next) => {

    // Mongoose will use clientID of document.
    ClientModel.findOneAndRemove({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.status(200).json({
                msg: data
            });
        }
    });
});

module.exports = router