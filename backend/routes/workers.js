const express = require("express");
const router = express.Router()
const WorkerModel = require('../models/worker');
const OrgModel = require('../models/org');

//POTENTIALLY add a get route by role in the role field

// POST(CREATE): an endpoint that will insert an worker info into DB.
router.post('/', (req, res, next) => {

    WorkerModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Worker information is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all worker info.
router.get('/', (req, res, next) => {

    WorkerModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Worker information not found');
        }
        else {
            res.json(data);
        }
    });
});

// GET(READ): endpoint to combine worker first name and last name
//https://www.mongodb.com/docs/manual/reference/operator/aggregation/concat/
router.get('/firstlast', (req, res, next) => {

    WorkerModel.aggregate([
        { $project: { workerID: 1, firstLast: { $concat: [ "$firstName", " ", "$lastName" ] } } }
    ],
        
        (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Worker information not found');
        }
        else {
            res.json(data);
        }
    });
});

router.get('/summary', (req, res, next) => {

    WorkerModel.aggregate([
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: OrgModel.collection.name,
                localField: "orgID",
                foreignField: "orgID",
                as: "orgInfo",
            }
        }, { $unwind: "$orgInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                workerID: 1,
                lastName: 1,
                firstName: 1,
                orgID: 1,
                role: 1,
                orgName: "$orgInfo.orgName"
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

// GET(READ): an endpoint to retrieve specific worker info by work ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on workID
    WorkerModel.findOne({ workerID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Worker information not found');
        }
        else {
            res.json(data);
        }
    });
});

// GET(READ): an endpoint to retrieve specific worker info by work ID IN AN ARRAY
//Easier to iterate over for single vue pages.
router.get('/summary/:id', (req, res, next) => {

    WorkerModel.aggregate([{ $match: { workerID: req.params.id } },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: OrgModel.collection.name,
                localField: "orgID",
                foreignField: "orgID",
                as: "orgInfo",
            }
        }, { $unwind: "$orgInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                workerID: 1,
                lastName: 1,
                firstName: 1,
                orgID: 1,
                role: 1,
                orgName: "$orgInfo.orgName"
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


// GET(READ): an endpoint to retrieve worker by worker last name.
router.get('/lastname/:lastName', (req, res, next) => {

    // Finding document based on worker last name.
    WorkerModel.find({ lastName: req.params.lastName }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Worker not found');
        }
        else {
            res.json(data);
        }
    }).sort({ workerID: 1 });
});


// PUT(Update): an endpoint to edit a work record by work ID
router.put('/:id', (req, res, next) => {

    WorkerModel.findOneAndUpdate({ workerID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        } 
        else {
            res.send('Worker is edited via PUT.');
            console.log('Worker information was successfully updated!', data)
        }
    });
});


// DELETE: an endpoint to delete a work record by work ID
router.delete('/:id', (req, res, next) => {

    WorkerModel.findOneAndRemove({ workerID: req.params.id}, (error, data) => {
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