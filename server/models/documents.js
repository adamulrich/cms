// {
//     "_id": {
//       "$oid": "58cb2ab6a187c5aa1124e30f"
//     },
//     "id": "1",
//     "name": "CIT 425 - Data Warehousing",
//     "url": "https://rkjdatawarehousing.wordpress.com/",
//     "children": [
//       {
//         "id": "2",
//         "name": "Project 1 – The Kimball Method",
//         "url": "https://rkjdatawarehousing.wordpress.com/projects/project-1-the-kimball-method/"
//       }
//     ]
//   }

const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   url: { type: String, required: true },
   children: [{ id: { type: String, required: true },
                name: { type: String },
                url: { type: String, required: true } }]
});

module.exports = mongoose.model('Document', documentSchema);