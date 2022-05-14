const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let counterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        require: true
    }
},
    {
        collection: 'counters'
    });

module.exports = mongoose.model('counter', counterSchema);