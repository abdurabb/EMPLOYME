const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const plan = mongoose.Schema({

    planName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    planPrice: {
        type: String,
        required: true
    },
    planDuration: {
        value: { type: Number, required: true }, // Numeric value (e.g., 3 for 3 months, 1 for 1 year)
        unit: { type: String, required: true }, // Unit of time (e.g., 'months', 'years', 'days')
    },
    isActive: {
        type: String,
        default: true
    }
})

module.exports = mongoose.model("Plan", plan)