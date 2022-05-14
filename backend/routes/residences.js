const express = require("express");
const router = express.Router()
const ResidenceModel = require('../models/residence');

// POST(CREATE): an endpoint that will insert client residence info into DB.
router.post('/', (req, res, next) => {

    ResidenceModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Residence info is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all client residence info from the API.
router.get('/', (req, res, next) => {

    ResidenceModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
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


// GET(READ): an endpoint to retrieve specific client residence by client ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on clientID
    ResidenceModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client residence info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);     // Only return the latest document
});


// GET(READ): an endpoint to get all client residence edit history from the API.
router.get('/history/:id', (req, res, next) => {

    ResidenceModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client residence info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a residence record by clientid.
router.put('/:id', (req, res, next) => {

    ResidenceModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Residence is edited via PUT.');
            console.log('Residence successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete specific residence record by client ID.
router.delete('/:id', (req, res, next) => {

    // Mongoose will use clientID of document.
    ResidenceModel.remove({ clientID: req.params.id }, (error, data) => {
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