
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const job = mongoose.Schema({

    position: {
        type: String,
        required:true
    },
    subCategory: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    location:{
        type:String,
        required:true
    },
    salary: {
        type: String,
        required: true
    },
    experience:{
        type:String,
        required:true
    },
    company:{
        type:ObjectId,
        ref:'Company'
    },
    Hiring_Date:{
        type:Date,
        default:Date.now()
    },
    hiringClosed:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model("Job",job)