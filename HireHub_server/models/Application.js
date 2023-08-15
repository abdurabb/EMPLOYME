
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const application = mongoose.Schema({

    skill:{
        type:String
    },
    experience:{
        type:String
    },
    user: {
        type: ObjectId,
        ref:'User'
    },
    job: {
        type: ObjectId,
        ref:'Job'
    },
    sslcCertificate:{
        type:String,
    },
    plusTwo:{
        type:String
    },
    plusTwoCertificate:{
        type:String
    },
    degree:{
        type:String
    },
    degreeCertificate:{
        type:String
    },
    otherQualification:{
        type:String
    },
    otherQualificationCertificate:{
        type:String
    },
    cv:{
        type:String
    },
    Status:{
        type:String,
        default:'pending'
    }
    

    
})

module.exports = mongoose.model("Application", application)