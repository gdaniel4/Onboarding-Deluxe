const express = require("express");
const router = express.Router()
const ActivityModel = require('../models/activity');
const WorkerModel = require('../models/worker');


// POST(CREATE): an endpoint that will insert an activity info into DB.
router.post('/', (req, res, next) => {

    ActivityModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Activity info is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all activities - Summary page (viewed by supervisor).
router.get('/', (req, res, next) => {

    ActivityModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// GET(READ): an endpoint to get an activity 

router.get('/activity/:id', (req, res, next) => {

    ActivityModel.findOne({activityID: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity not found');
        }
        else {
            res.json(data);
        }
    })
});

//:ID parameter is referring to clientID from client table, in the attending field
router.get('/activity/client/:id', (req, res, next) => {

    ActivityModel.find({attending: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Clients not found');
        }
        else {
            res.json(data);
        }
    })
});


// Reference: https://stackoverflow.com/questions/35813854/how-to-join-multiple-collections-with-lookup-in-mongodb 

// GET(READ): an endpoint to get all activities - Summary page (viewed by supervisor).
router.get('/summary', (req, res, next) => {

    ActivityModel.aggregate([
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: WorkerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                activityID: 1,
                workerID: 1,
                program: 1,
                shortNotes: 1,
                datetime: 1,
                timeSpend: 1,
                workerID: 1,
                hasUsedServices: 1,
                handlingStatus: 1,
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName",
                orgID: 1,
                role: 1,
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

//Summary of activities and 
//:id param refers to ActivityID in the attending field of this table
router.get('/summary/:id', (req, res, next) => {

    ActivityModel.aggregate([ { $match: { activityID: req.params.id } },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: WorkerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                activityID: 1,
                workerID: 1,
                program: 1,
                shortNotes: 1,
                datetime: 1,
                timeSpend: 1,
                workerID: 1,
                hasUsedServices: 1,
                handlingStatus: 1,
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName",
                orgID: 1,
                role: 1,
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

// Gets all activities with matching clientids
router.get('/summary/:clientid', (req, res, next) => {

    ActivityModel.aggregate([ { $match: { attending: req.params.clientid } },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: WorkerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                activityID: 1,
                workerID: 1,
                program: 1,
                shortNotes: 1,
                datetime: 1,
                timeSpend: 1,
                workerID: 1,
                hasUsedServices: 1,
                handlingStatus: 1,
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName",
                orgID: 1,
                role: 1,
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


// GET(READ): an endpoint to retrieve all activities by program - Summary page (viewed by supervisor).
router.get('/summary-program/:program', (req, res, next) => {

    // Finding document based on program
    ActivityModel.aggregate([ { $match: { program: req.params.program } },
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: WorkerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                workerID: 1,
                program: 1,
                shortNotes: 1,
                datetime: 1,
                timeSpend: 1,
                workerID: 1,
                hasUsedServices: 1,
                handlingStatus: 1,
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});


// GET(READ): an endpoint to retrieve all activities by event date - Summary page (viewed by supervisor).
router.get('/summary-datetime/:datetime', (req, res, next) => {

    // Finding document based on datetime
    ActivityModel.aggregate([ { $match: { datetime: req.params.datetime } }, 
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: WorkerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                workerID: 1,
                program: 1,
                shortNotes: 1,
                datetime: 1,
                timeSpend: 1,
                workerID: 1,
                hasUsedServices: 1,
                handlingStatus: 1,
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});



// GET(READ): an endpoint to retrieve all activities by worker ID - Summary page (viewed by supervisor).
router.get('/summary-worker/:id', (req, res, next) => {

    // Finding document based on workerID
    ActivityModel.aggregate([ { $match: { workerID: req.params.id } }, 
        {
            // JOIN WORKER COLLECTION.
            $lookup: {
                from: WorkerModel.collection.name,
                localField: "workerID",
                foreignField: "workerID",
                as: "workerInfo",
            }
        }, { $unwind: "$workerInfo" },
        {
            // DEFINE THE FIELDS THAT NEED TO FETCH.
            $project: {
                workerID: 1,
                program: 1,
                shortNotes: 1,
                datetime: 1,
                timeSpend: 1,
                workerID: 1,
                hasUsedServices: 1,
                handlingStatus: 1,
                workerLastName: "$workerInfo.lastName",
                workerFirstName: "$workerInfo.firstName"
            }
        }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Activity info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// PUT(Update): an endpoint to add clients to acitivity attending.
router.put('/update/attending', (req, res) => {

    ActivityModel.findOneAndUpdate({ activityID: req.body.activityID }, { $push: { attending: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been added to attending list.');
        }
    });
});

//update attending using client id in req.params
router.put('/update/attending/:actid/:id', (req, res) => {

    ActivityModel.findOneAndUpdate({ activityID: req.params.actid }, { $push: { attending: req.params.id } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been added to attending list.');
        }
    });
});

router.put('/update/worker/:id', (req, res) => {

    ActivityModel.findOneAndUpdate({ activityID: req.body.activityID }, { workerID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Worker has been assigned to activity.');
        }
    });
});

router.put('/remove/attending', (req, res) => {

    ActivityModel.findOneAndUpdate({ activityID: req.body.activityID }, { $pull: { attending: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been removed from attending list.');
        }
    });
});

router.put('/remove/attending/:activityID/:clientID', (req, res) => {

    ActivityModel.findOneAndUpdate({ activityID: req.params.activityID }, { $pull: { attending: req.params.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been removed from attending list.');
        }
    });
});

// PUT(Update): an endpoint to edit a activity record by activityid.
router.put('/:id', (req, res, next) => {

    ActivityModel.findOneAndUpdate({ activityID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Activity is edited via PUT.');
            console.log('Activity successfully updated!', data)
        }
    })
});


// DELETE: an endpoint to delete a activity record by _id.
router.delete('/:id', (req, res, next) => {

    ActivityModel.remove({ activityID: req.params.id }, (error, data) => {
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