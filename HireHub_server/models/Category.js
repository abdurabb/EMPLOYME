const {ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const category = mongoose.Schema({

    is_delete:{
        type:String,
        default:false,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model("Category",category)