const jwt = require('jsonwebtoken')
const User = require("../models/User")
async function AdminAuth(req, res, next) {
    try {
        const authorization = req.headers['authorization']
        if (!authorization) throw new Error("Authorization header required")
        const token = authorization
        const verification = jwt.verify(token, process.env.JWT_SECRET_KEY )

        const userData = await User.findById({ _id: verification.id })
        if (!userData) throw new Error('Admin Not Found')
        req.user = userData
        if(userData.isAdmin === false) throw new Error('Your Are Not Admin')
        next()

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = AdminAuth