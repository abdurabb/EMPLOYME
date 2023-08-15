const express = require('express')
const user_route = express.Router();
const multer = require('multer')
const path = require('path');

const userControllerLogin = require('../controller/userController/userLogin')
const userControllerJobs = require('../controller/userController/jobs')
const userControllerProfile = require('../controller/userController/profile')
const userControllerPremium = require('../controller/userController/premium')
const userControllerApplication = require('../controller/userController/jobApplication')
const userControllerChat = require('../controller/userController/chat')
const userControllerTokenCheck = require('../controller/userController/tokenCheck')

const userAuth=require('../middleware/userAuth')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public"), function (error, success) {
            if (error) {
                console.log(error);
            }
        })
    },
    filename: function (req, file, cb) {
        const name = Date.now() + "-" + file.originalname;
        cb(null, name, function (error, success) {
            if (error) {
                console.log(error);
            }
        })
    }
})
const upload = multer({ storage: storage })

user_route.post('/loginUser', userControllerLogin.loginUser)
user_route.post('/registerUser',upload.single('image'), userControllerLogin.registerUser)
user_route.get('/user_find',userControllerLogin.userFind)
user_route.post('/userCheck', userControllerLogin.userCheck)
user_route.get('/userData',userControllerLogin.getUserData)
user_route.get('/jobData',userControllerJobs.jobData)
user_route.get('/profileData',userControllerProfile.profileData)
user_route.post('/updateProfile',userControllerProfile.updateProfile)
user_route.post('/updateImage',userControllerProfile.updateImage)
user_route.get('/premiumData',userControllerPremium.getPremium)
user_route.post('/checkout',userControllerPremium.checkOut)
user_route.patch('/confirmation',userControllerPremium.confirm) 
user_route.post('/apply_job',userControllerApplication.applyJob)
user_route.get('/getApplication',userControllerApplication.ApplicationList)
user_route.get('/token_check',userAuth,userControllerTokenCheck.tokenCheck)
// chat 
user_route.get('/companyDataList',userControllerChat.getCompanies)
user_route.get('/chatMesseges',userControllerChat.getMesseges)
user_route.post('/createNewMessege',userControllerChat.createNewMessege)
user_route.post('/createNewChat',userControllerChat.createNewChat)

module.exports = user_route;