const express = require("express");
const router = express.Router();
const IncomeModel = require('../models/income');

// POST(CREATE) an endpoint to insert client income info into DB
router.post('/', (req, res, next) => {

    IncomeModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send('Client Income Info is added to the database.');
        }
    });
});


// GET(READ) an endpoint to retrieve all client's income info from the DB.
router.get('/', (req, res, next) => {

    IncomeModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
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


// GET(READ): an endpoint to retrieve specific client income info by client ID.
router.get('/:id', (req, res, next) => {

    IncomeModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client income information not found.');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});


// GET(READ): an endpoint to get all client income edit history from the API.
router.get('/history/:id', (req, res, next) => {

    IncomeModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Client income information not found.');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a income record by clientid.
router.put('/:id', (req, res, next) => {

    IncomeModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Income is edited via PUT.');
            console.log('Income successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete a client income record by client ID.
router.delete('/:id', (req, res, next) => {

    IncomeModel.remove({ clientID: req.params.id }, (error, data) => {
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

module.exports = router;