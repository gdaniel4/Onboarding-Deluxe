const express = require("express");
const router = express.Router()
const CounterModel = require('../models/counter');

// POST(CREATE): an endpoint that will add a counter instant for client ID.
router.post('/', (req, res, next) => {

    CounterModel.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Counter is added to the database.');
        }
    });
});


// GET(READ): an endpoint to get all sequence/counter.
router.get('/', (req, res, next) => {

    CounterModel.find((error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Counter not found.');
        }
        else {
            res.json(data);
        }
    });
});


// GET(READ): an endpoint to get the current sequence/counter number.
router.get('/:seqName', (req, res, next) => {

    CounterModel.findOne({ _id: req.params.seqName }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Counter not found.');
        }
        else {
            res.json(data);
        }
    });
});


// GET(READ): an endpoint to check if the sequence exist.
router.get('/find/:seqName', (req, res, next) => {

    CounterModel.findOne({ _id: req.params.seqName }, (error, data) => {
        if (error) {
            return next(error);
        }
        else if (data === null) {
            res.status(404).send('Counter not found.');
        }
        else {
            res.json(data);
        }
    }).count();
});


// PUT(Update): an endpoint to update the sequence/counter to the next number.
router.put('/:seqName', (req, res, next) => {

    CounterModel.findOneAndUpdate({ _id: req.params.seqName }, { $inc: {seq: 1} }, (error, data) => {
        if (error) {
            return next(error);
        }
        else {
            res.send('Counter number is incresed via PUT.');
            console.log('Counter number is incresed.')
        }
    });
});


module.exports = router