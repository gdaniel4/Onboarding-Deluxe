const express = require("express");
const router = express.Router();
const governmentHelpModel = require('../models/governmentHelp');

// POST(CREATE): an endpoint that will insert government help help info into a DB.
router.post('/', (req, res, next) => {

    governmentHelpModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Government Help info is added to the databse.');
        }
    });
});


// GET(READ): an endpoint to get all government help help info from the API.
router.get('/', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    governmentHelpModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
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

// GET(READ): an endpoint to retrieve specific government help info by client ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on clientID
    governmentHelpModel.find({ clientID: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } 
        else if (data === null) {
            res.status(404).send('Client government help info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});


// GET(READ): an endpoint to get all government help info edit history from the API.
router.get('/history/:id', (req, res, next) => {

    governmentHelpModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client government help info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a government help record by clientid.
router.put('/:id', (req, res, next) => {

    governmentHelpModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Govt Help is edited via PUT.');
            console.log('Govt Help successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete government help record by client ID.
router.delete('/:id', (req, res, next) => {

    governmentHelpModel.remove({ clientID: req.params.id }, (error, data) => {
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