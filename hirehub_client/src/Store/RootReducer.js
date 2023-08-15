import {combineReducers} from "@reduxjs/toolkit";
import adminAuth from "./AdminAuth";
import userAuth from "./UserAuth";
import CompanyAuth from './CompanyAuth'

const rootReducer = combineReducers({
    admin:adminAuth,
    user:userAuth,
    company:CompanyAuth
})

export default rootReducer;