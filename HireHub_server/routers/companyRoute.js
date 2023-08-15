const express = require('express')
const company_route=express.Router();

const companyControllerGetCategory = require('../controller/companyController/getCategory')
const companyControllerLogin = require('../controller/companyController/login')
const companyControllerJobPost = require('../controller/companyController/jobPost')
const companyControllerProfile = require('../controller/companyController/companyProfile')
const companyControllerApplication = require('../controller/companyController/application')
const companyControllerChat = require('../controller/companyController/chat')
const companyControllerTokenCheck = require('../controller/companyController/tokenCheck')

const companyAuth = require('../middleware/companyAuth')

company_route.get('/categoryGet',companyControllerGetCategory.categoryGet)
company_route.post('/companyCheck',companyControllerLogin.companyCheck)
company_route.post('/companyRegistration',companyControllerLogin.registration)
company_route.post('/companyLogin',companyControllerLogin.login)
company_route.post('/jobPost',companyControllerJobPost.jobPost)
company_route.get('/postedJobs',companyControllerJobPost.postedJobs)
company_route.patch('/jobStatusChange',companyControllerJobPost.statusChange)
company_route.get('/jobDataById',companyControllerJobPost.getDataById)
company_route.put('/edit_job',companyControllerJobPost.editJob)
company_route.get('/company_profileData',companyControllerProfile.getProfile)
company_route.patch('/updateImage',companyControllerProfile.updateImage)
company_route.put('/updateProfile',companyControllerProfile.updateProfile)
company_route.get('/getCandidates',companyControllerApplication.getCandidates)
company_route.get('/token_check',companyAuth,companyControllerTokenCheck.tokenCheck)
company_route.patch('/updateStatus',companyAuth,companyControllerApplication.updateStatus)
// chat routers
company_route.get('/userDataList',companyControllerChat.getUsers)
company_route.post('/createNewMessege',companyControllerChat.createNewMessege)
company_route.get('/chatMesseges',companyControllerChat.getMesseges)
company_route.post('/createNewChat',companyControllerChat.createNewChat)

module.exports=company_route;