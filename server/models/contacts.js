// {
//     _id: ObjectId("58c767386f1d58ebc37af1e9"),
//     id: '1',
//     name: 'Rex Barzee',
//     email: 'barzeer@byui.edu',
//     phone: '208-496-3768',
//     imageUrl: '../assets/images/barzeer.jpg',
//     group: [],
//     __v: 14
//   }

const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String, required: true },
   email: { type: String, required: true },
   phone: { type: String, required: true },
   imageUrl: { type: String, required: true },
   group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});

module.exports = mongoose.model('Contact', contactSchema);