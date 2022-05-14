const express = require("express");
const router = express.Router()
const EventModel = require('../models/event');

// POST(CREATE): an endpoint that will insert event info into a DB.
router.post('/', (req, res, next) => {

    EventModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event info is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all events from the API.
router.get('/', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    EventModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });

});

//Get(READ): and endpoint to get specific event by event ID BUT IN AN ARRAY, easier to "iterate" for front end single(view) pages
router.get('/arr/:id', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    EventModel.find({ eventID: req.params.id },(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });

});

//Get(READ): and endpoint to get specific event by event ID 
//USING PARAMETERS 
router.get('/client/:id', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    EventModel.find({ attending: req.params.id },(error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });

});




// GET(READ): an endpoint to retrieve specific event by event ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on eventID
    EventModel.findOne({ eventID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Event not found');
        }
        else {
            res.json(data);
        }
    })//.sort({ modifyAt: -1 }).limit(1);     // Only return the latest document
});


// GET(READ): an endpoint to retrieve event by eventDate.
router.get('/eventDate/:eventDate', (req, res, next) => {

    // Finding document based on event last name.
    EventModel.aggregate([{ $sort: { eventID: 1, modifyAt: 1 } },
        { $group: { _id: "$eventID", latest: { $last: "$$ROOT" } } },
        { $match: { "latest.eventDate": req.params.eventDate } }
    ], (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Event not found');
        }
        else {
            res.json(data);
        }
    }).sort({ _id: 1 });
});


// GET(READ): an endpoint to get all events edit history from the API.
router.get('/history/:id', (req, res, next) => {

    EventModel.find({ eventID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Event not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to add clients to event attending.
router.put('/update/attending', (req, res) => {

    EventModel.findOneAndUpdate({ eventID: req.body.eventID }, { $push: { attending: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been added to attending list.');
        }
    });
});

// PUT(Update): an endpoint to add clients to event attending USING PARAMETERS
router.put('/update/attending/:eventID/:clientID', (req, res) => {

    EventModel.findOneAndUpdate({ eventID: req.params.eventID }, { $push: { attending: req.params.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been added to attending list.');
        }
    });
});

// PUT(Update): an endpoint to remove clients from event attending.
router.put('/remove/attending', (req, res) => {

    EventModel.findOneAndUpdate({ eventID: req.body.eventID }, { $pull: { attending: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been removed from attending list.');
        }
    });
});

// PUT(Update): an endpoint to remove clients from event attending USING PARAMETERS
router.put('/remove/attending/:eventID/:clientID', (req, res) => {

    EventModel.findOneAndUpdate({ eventID: req.body.eventID }, { $pull: { attending: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been removed from attending list.');
        }
    });
});

// PUT(Update): an endpoint to edit a event record by eventid.
router.put('/:id', (req, res, next) => {

    EventModel.findOneAndUpdate({ eventID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Event is edited via PUT.');
            console.log('Event successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete a event by event ID and modify time.
router.delete('/:id', (req, res, next) => {

    // Mongoose will use eventID of document.
    EventModel.remove({ eventID: req.params.id }, (error, data) => {
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