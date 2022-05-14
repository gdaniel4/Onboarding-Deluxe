const express = require("express");
const router = express.Router();
const HealthModel = require('../models/health');

// POST(CREATE): an endpoint that will insert health insurance info into a DB.
router.post('/', (req, res, next) => {

    HealthModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Health info is added to the databse.');
        }
    });
});


// GET(READ): an endpoint to get all health insurance info from the API.
router.get('/', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    HealthModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
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

// GET(READ): an endpoint to retrieve specific health insurance info by client ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on clientID
    HealthModel.find({ clientID: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } 
        else if (data === null) {
            res.status(404).send('Client health insurance info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});


// GET(READ): an endpoint to get all health insurance info edit history from the API.
router.get('/history/:id', (req, res, next) => {

    HealthModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client health insurance info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a health record by clientid.
router.put('/:id', (req, res, next) => {

    HealthModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Health is edited via PUT.');
            console.log('Health successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete health insurance record by client ID.
router.delete('/:id', (req, res, next) => {

    HealthModel.remove({ clientID: req.params.id }, (error, data) => {
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