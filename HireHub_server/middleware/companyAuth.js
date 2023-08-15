const jwt = require('jsonwebtoken')
const Company = require("../models/Company")
async function companyAuth(req, res, next) {
    try {
        const authorization = req.headers['authorization']
        if (!authorization) throw new Error("Authorization header required")
        const token = authorization
        const verification = jwt.verify(token, process.env.JWT_SECRET_KEY)

        const companyData = await Company.findById({ _id: verification.id })
        if (!companyData) throw new Error('Company Not Found')
        req.company = companyData
        next()

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = companyAuth