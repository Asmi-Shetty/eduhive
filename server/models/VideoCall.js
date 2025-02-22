const mongoose = require('mongoose');

const videoCallSchema = new mongoose.Schema({
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'user'
     }],
  group: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: 'Group', 
     required: false 
    },
  startTime: { 
    type: Date, 
    default: Date.now 
},
  endTime: {
     type: Date
     },
  callId: { 
    type: String, 
    required: true, 
    unique: true
 }
});

module.exports = mongoose.model('VideoCall', videoCallSchema);
