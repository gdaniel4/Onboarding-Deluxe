const express = require("express");
const router = express.Router()
const EmploymentModel = require('../models/employment');

// POST(CREATE): an endpoint that insert client employment info into a DB.
router.post('/', (req, res, next) => {

    EmploymentModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Employment information is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all client employment info from the API.
router.get('/', (req, res, next) => {

    EmploymentModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
    {
        $group:
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


// GET(READ): an endpoint to retrieve specific client employment info by client ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on clientID
    EmploymentModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Employment information not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});


// GET(READ): an endpoint to get all client employment edit history from the API.
router.get('/history/:id', (req, res, next) => {

    EmploymentModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Employment information not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a employment record by clientid.
router.put('/:id', (req, res, next) => {

    EmploymentModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Employment is edited via PUT.');
            console.log('Employment successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete a client employment record by client ID.
router.delete('/:id', (req, res, next) => {

    EmploymentModel.remove({ clientID: req.params.id }, (error, data) => {
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