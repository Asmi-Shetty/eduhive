const mongoose = require('mongoose');

const pollOptionSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true
 },
  votes: { 
    type: Number, 
    default: 0 
}
});

const pollSchema = new mongoose.Schema({
  question: {
     type: String,
     required: true
     },
  options: 
  [pollOptionSchema],
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true
 },
  group: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Group', 
    required: false 
},
  createdAt: {
     type: Date, 
     default: Date.now
     }
});

module.exports = mongoose.model('Poll', pollSchema);
