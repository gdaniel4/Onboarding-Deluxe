const express = require("express");
const router = express.Router();
const OrgModel = require('../models/org');

// POST(CREATE): an endpoint that will insert organization info into a DB.
router.post('/', (req, res, next) => {

    OrgModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Organization info has been added to the databse.');
        }
    });
});


// GET(READ): an endpoint to get all organization info from the API.
router.get('/', (req, res, next) => {

    // The plain way to get all the data from the collection through the mongoose schema.
    OrgModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.json(data);
        }
    }).sort({ datetime: -1 });
});

// GET(READ): an endpoint to retrieve specific organization info by org ID.
router.get('/:id', (req, res, next) => {

    // Finding document based on orgID
    OrgModel.findOne({ orgID: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } 
        else if (data === null) {
            res.status(404).send('Organization info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});

// GET(READ): an endpoint to retrieve specific organization info by org ID.
//IN AN ARRAY, EASY TO ITERATE OVER FOR SIGNLE VUES
router.get('/arr/:id', (req, res, next) => {

    // Finding document based on orgID
    OrgModel.find({ orgID: req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } 
        else if (data === null) {
            res.status(404).send('Organization info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 }).limit(1);
});


// GET(READ): an endpoint to get all organiztion info edit history from the API.
router.get('/history/:id', (req, res, next) => {

    OrgModel.find({ orgID: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Organization info not found');
        }
        else {
            res.json(data);
        }
    }).sort({ modifyAt: -1 });
});

// PUT(Update): an endpoint to edit a organization record by orgtid.
router.put('/:id', (req, res, next) => {

    OrgModel.findOneAndUpdate({ orgID: req.params.id }, { $set: req.body }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Org info is edited via PUT.');
            console.log('Org successfully updated!', data)
        }
    })
});

// PUT(Update): an endpoint to add clients to org array.
router.put('/update/clients', (req, res) => {

    OrgModel.findOneAndUpdate({ orgID: req.body.orgID }, { $push: { clients: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been added to organization.');
        }
    });
});

/*
// PUT(Update): an endpoint to remove clients from org array.
router.put('/remove/clients', (req, res) => {

    OrgModel.findOneAndUpdate({ orgID: req.body.orgID }, { $pull: { clients: req.body.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been removed from organization.');
        }
    });
});
*/

// PUT(Update): an endpoint to remove clients from org array.
router.put('/remove/clients/:orgID/:clientID', (req, res) => {

    OrgModel.findOneAndUpdate({ orgID: req.params.orgID }, { $pull: { clients: req.params.clientID } }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Client has been removed from organization.');
        }
    });
});

// DELETE: an endpoint to delete organization record by orgID.
router.delete('/:id', (req, res, next) => {

    OrgModel.remove({ orgID: req.params.id }, (error, data) => {
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