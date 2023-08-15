
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const user = mongoose.Schema({

    isAdmin:{
        type:Boolean,
        default:false
    },
    isBlocked:{
        type:Boolean,
        default:false
    },
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    },
    appliedJobs:{
        type:ObjectId
    },
    hasPlan:{
        type:Boolean,
        default:false
    },
    planEndingDate:{
        type:Date,
        // default:'You Have Not Plan'
    }
    
})

module.exports= mongoose.model("User",user)