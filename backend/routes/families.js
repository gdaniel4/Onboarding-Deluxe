const express = require("express");
const router = express.Router()
const FamilyModel = require('../models/family');

// POST(CREATE): an endpoint that will insert family info into a DB.
router.post('/', (req, res, next) => {

    FamilyModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Family member info is added to the database.');
        }
    });
});


// GET(READ): an endpoint to retrieve all family info.
router.get('/', (req, res, next) => {

    FamilyModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Family member info not found');
        }
        else {
            res.json(data);
        }
    });
});


// GET(READ): an endpoint to retrieve specific family info by client ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on clientID
    FamilyModel.findOne({ clientID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Family member info not found');
        }
        else {
            res.json(data);
        }
    });
});


// PUT(UPDATE): an endpoint to add family member into list by client ID.
router.put('/add-member/:id', (req, res, next) => {

    // Find document by client ID
    FamilyModel.findOneAndUpdate({ clientID: req.params.id }, {
        $push: {
            familyMember: req.body     // familyMember is an array: push the new member to this array.
        }
    }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Family member is added via PUT.');
            console.log('Family member is added.')
        }
    });
});


// PUT(UPDATE): an endpoint to delete a family member from list by client ID.
router.put('/delete-member/:clientID/:memberID', (req, res, next) => {

    // Find document by client ID
    FamilyModel.findOneAndUpdate({ clientID: req.params.clientID }, {
        $pull: {
            familyMember: { "_id": req.params.memberID }     // familyMember is an array: delete a member from this array.
        }
    }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Family member is deleted via PUT.');
            console.log('Family member is deleted.')
        }
    });
});

// PUT(Update): an endpoint to edit a family record by clientid.
router.put('/:id', (req, res, next) => {

    FamilyModel.findOneAndUpdate({ clientID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Family is edited via PUT.');
            console.log('Family successfully updated!', data)
        }
    })
});

// DELETE: an endpoint to delete family member record by client ID.
router.delete('/:id', (req, res, next) => {

    FamilyModel.findOneAndRemove({ clientID: req.params.id }, (error, data) => {
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