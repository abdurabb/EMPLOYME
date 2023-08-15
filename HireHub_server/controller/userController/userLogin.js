const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// ----------------------TWILIO-----------
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
    lazyLoading: true
});
// ----------------------------------------

const registerUser = async (req, res) => {
    try {
        const body = req.body

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Data',
            })
        }

        const spassword = await bcrypt.hash(body.values.password, 10)
        const user1 = new User({
            first_name: body.values.firstName,
            last_name: body.values.lastName,
            dob: body.values.dob,
            gender: body.values.gender,
            email: body.values.email,
            mobile: body.values.phone,
            qualification: body.values.qualification,
            address: body.values.address,
            post: body.values.post,
            district: body.values.district,
            state: body.values.state,
            country: body.values.country,
            Image: body.url,
            zipCode: body.values.zipCode,
            password: spassword,
        })
        const userData = await user1.save()
        if (userData) {
            return res.status(200).json({
                success: true,
                message: 'Successfully Registred'
            })
        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            error: err
        })
    }
}


const userCheck = async (req, res) => {
    const body = req.body.values;
    const emailCheck = await User.findOne({ email: body.email })
    if (!emailCheck) {
        const phoneCheck = await User.findOne({ mobile: body.phone })
        if (!phoneCheck) {
            return res.status(200).json(({
                success: true,
                message: 'Success'
            }))
        } else {
            return res.status(400).json(({
                success: false,
                error: 'Mobile Aready Registred'
            }))
        }
        
    } else {
        return res.status(400).json(({
            success: false,
            error: 'Email Aready Registred'
        }))
    }
}


const loginUser = async (req, res) => {
    const body = req.body.values;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Data',
        })
    }
    const userDetail = await User.findOne({ email: body.email })
    if (userDetail) {

        if (userDetail.isBlocked === false) {

            const passwordMatch = await bcrypt.compare(body.password, userDetail.password)
            if (passwordMatch && userDetail.isAdmin === false) {
                // JWT
                let userLogin = {
                    userId: null,
                    Status: false,
                    message: null,
                    token: null,
                    name: null,
                };

                userLogin.Status = true;
                userLogin.name = userDetail.first_name;
                userLogin.userId = userDetail._id;
                userLogin.message = 'success'
                let token = jwt.sign({ id: userDetail._id }, "secretCodeforUser", {
                    expiresIn: "30d",
                });
                userLogin.token = token;
                let name = userDetail.first_name

                let obj = {
                    token,
                    name
                };

                return res.status(200).json({
                    success: true,
                    message: 'Succecfully Loged',
                    obj: obj,
                    userLogin: userLogin
                })

            } else {
                console.log('incorect  password');
                return res.status(400).json({
                    success: false,
                    error: 'Incorect Password',
                })
            }
        } else {
            console.log('incorect Email');
            return res.status(400).json({
                success: false,
                error: 'You Are Blocked',
            })
        }
    } else {
        console.log('incorect Email');
        return res.status(400).json({
            success: false,
            error: 'Incorect Email',
        })
    }



}

// UserData Taking By user Id (findById)
const getUserData = async (req, res) => {
    try {
        let userData = await User.findById({ _id: req.query.id })
        if (userData) {
            return res.status(200).json({
                success: true,
                data: userData,
                message: 'Success'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something Wrong',
            error
        })
    }
}


//  Login With Google Setup 

// User check if have Already Have or not , (navigate to profileDetail or home page)
const userFind = async (req, res) => {
    
    try {
        const email = req.query.email
        const userDetail = await User.findOne({ email: email })
        
        if (userDetail !== null) {
            // JWT
            let userLogin = {
                userId: null,
                Status: false,
                message: null,
                token: null,
                name: null,
            };

            

            userLogin.Status = true;
            userLogin.name = userDetail.first_name;
            userLogin.userId = userDetail._id;
            userLogin.message = 'success'
            // jwt
            let token = jwt.sign({ id: userDetail._id }, "secretCodeforUser", {
                expiresIn: "30d",
            });
            userLogin.token = token;
            let name = userDetail.first_name

            let obj = {
                token,
                name
            };



            return res.status(200).json({
                success: true,
                message: 'Succecfully Loged',
                obj: obj,
                test:true,
                userLogin: userLogin
            })



        } else {
            return res.status(200).json({
                success: true,
                test: false
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: 'Something Wrong',
            error
        })
    }

}

module.exports = {
    loginUser,
    registerUser,
    userCheck,
    getUserData,
    userFind
}