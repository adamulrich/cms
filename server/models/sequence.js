// {
//     "_id": {
//       "$oid": "6498f483da4d1a324fffd5ad"
//     },
//     "maxDocumentId": 100,
//     "maxMessageId": 101,
//     "maxContactId": 101
//   }



const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxDocumentId: { type: Number, required: true },
    maxMessageId: { type: Number, required: true },
    maxContactId: { type: Number, required: true },
});

module.exports = mongoose.model('Sequence', sequenceSchema);