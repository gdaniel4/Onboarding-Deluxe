const express = require("express");
const router = express.Router()
const EducationModel = require('../models/education');

// POST(CREATE): an endpoint that will insert a client education info into DB.
router.post('/', (req, res, next) => {

    EducationModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Education information is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all clients education info from the API.
router.get('/', (req, res, next) => {

    EducationModel.aggregate([{ $sort: { clientID: 1, modifyAt: 1 } },
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


// GET(READ): an endpoint to retrieve specific client education info by client ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on clientID
    EducationModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Education information not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});


// GET(READ): an endpoint to get all client education edit history from the API.
router.get('/history/:id', (req, res, next) => {

    EducationModel.find({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Education information not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a  record by clientid.
router.put('/:id', (req, res, next) => {

    EducationModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Education is edited via PUT.');
            console.log('Education successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete a client education record by client ID.
router.delete('/:id', (req, res, next) => {

    EducationModel.remove({ clientID: req.params.id }, (error, data) => {
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