const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


// Admin Login
const check = async (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Data',
        })
    }

    const userDetail = await User.findOne({ email: body.values.email })
    if (userDetail && userDetail.isAdmin) {
        const passwordMatch = await bcrypt.compare(body.values.password, userDetail.password)
        if (passwordMatch) {


            // JWT
            let adminLogin = {
                adminId: null,
                status: false,
                message: null,
                token: null,
                name: null,
            };

            adminLogin.status = true;
            adminLogin.name = userDetail.first_name;
            adminLogin.message = 'success'
            adminLogin.adminId = userDetail._id;
            let token = jwt.sign({ id: userDetail._id }, "secretCodeforUser", {
                expiresIn: "30d",
            });
            adminLogin.token = token;
            let name = userDetail.first_name
            let obj = {
                token,
                name
            };

            return res.status(200).json({
                success: true,
                message: 'Successfully Loged',
                obj: obj,
                adminLogin: adminLogin
            })
        } else {
            return res.status(400).json({
                success: false,
                error: 'Incorect User or Password',
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            error: 'Incorect User or Password',
        })
    }
}

module.exports = { check }