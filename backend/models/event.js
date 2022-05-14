//https://mongoosejs.com/docs/populate.html
//11/6/21 Changed String to string because axios cant send String as the body of a request.
const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//collection for events
let eventSchema = new Schema({
  _id: {
    type: String,
    default: uuid.v1 
  },
  eventID: {
    type: String,
    default: uuid.v1
  },
  eventName: {
    type: String,
    required: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  attending: {
    type: Array
  },
  eventDate: {
      type: Date,
      required: true
  },
  eventAddress: {
    type: String
  },
  eventZip: {
    type: Number
  },
  modifyAt: {
    type: Date
}
},
{
    timestamps: {
        createdAt: null,
        updatedAt: 'modifyAt',
        required: true
    }
},

  {
    collection: 'events'
  });

module.exports = mongoose.model('event', eventSchema)

