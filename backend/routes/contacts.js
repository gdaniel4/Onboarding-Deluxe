const express = require("express");
const router = express.Router()
const ContactModel = require('../models/contact');

// POST(CREATE): an endpoint that will insert a client contact info into DB.
router.post('/', (req, res, next) => {

    ContactModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Contact info is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all clients contact info from the API.
/*
router.get('/', (req, res, next) => {

    ContactModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
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
    });
});
*/

router.get('/', (req, res, next) => {

    ContactModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// GET(READ): an endpoint to retrieve specific client contact info by client ID.
router.get('/:id', (req, res, next) => {

    ContactModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client contact info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);     // Only return the latest document
});


// GET(READ): an endpoint to get all client contact edit history from the API.
router.get('/history/:id', (req, res, next) => {

    ContactModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client contact info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a contact record by clientid.
router.put('/:id', (req, res, next) => {

    ContactModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Contact is edited via PUT.');
            console.log('Contact successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete a client contact record by client ID.
router.delete('/:id', (req, res, next) => {

    ContactModel.remove({ clientID: req.params.id }, (error, data) => {
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