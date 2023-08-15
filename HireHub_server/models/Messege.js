const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const messege = mongoose.Schema({

    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat' },
    senderType: { type: String, enum: ['User', 'Company'] }, // Specify sender type
    receiverType: { type: String, enum: ['User', 'Company'] }, // Specify receiver type
    sender: { type: String,refPath: 'senderType' },
    receiver: { type: String,refPath: 'receiverType' },
    messege: { type: String },
    timestamp: { type: Date, default: Date.now },

})

module.exports = mongoose.model("Messege", messege)