const jwt = require('jsonwebtoken')
const User = require("../models/User")
async function userAuth(req, res, next) {
    try {
        const authorization = req.headers['authorization']
        if (!authorization) throw new Error("Authorization header required")
        const token = authorization
        const verification = jwt.verify(token, process.env.JWT_SECRET_KEY )

        const userData = await User.findById({ _id: verification.id })
        if (!userData) throw new Error('User Not Found')
        req.user = userData
        if(userData.isBlocked === true) throw new Error('This Account Blocked')
        next()

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = userAuth