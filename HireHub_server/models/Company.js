
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const company = mongoose.Schema({

    is_Approved: {
        type: Boolean,
        default: false
    },
    company_name: {
        type: String,
        required: true
    },
    gstNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    licence:{
        type:String,
        required:true
    },
    employeeNumber:{
        type:Number,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    Image: {
        type: String
    },
    Status:{
        type:String,
        default: 'Pending'
    }
})

module.exports = mongoose.model("Company", company)