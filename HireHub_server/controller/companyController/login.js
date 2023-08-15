const Company = require('../../models/Company')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const companyCheck = async (req, res) => {
    const data = req.body.values
    const checkEmail = await Company.findOne({ email: data.email })
    if (!checkEmail) {
        const phoneCheck = await Company.findOne({ mobile: data.phone })
        if (!phoneCheck) {
            return res.status(200).json({
                success: true,
                message: 'Success',
            })
        } else {
            return res.status(400).json({
                success: false,
                error: 'Mobile Already Registred',
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            error: 'Email Already Registred',
        })
    }
}


const registration = async (req, res) => {
    try {
        const body = req.body.values;
        if (!body || !req.body.url) {
            return res.status(400).json({
                success: false,
                error: 'No Category Data',
            })
        }
        const spassword = await bcrypt.hash(body.password, 10)
        const company1 = new Company({
            company_name: body.name,
            gstNumber: body.gst,
            email: body.email,
            mobile: body.phone,
            category: body.category,
            address: body.address,
            password: spassword,
            licence:body.licence,
            employeeNumber:body.employeeNum,
            country:body.country,
            Image:req.body.url
        })
        
        const companyData = await company1.save()
        if (companyData) {
            return res.status(200).json({
                success: true,
                messege: 'Succesfully Registred',
            })
        }
    } catch (error) {
        console.log(error);
    }
}


const login = async (req, res) => {
    const body = req.body.values;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong'
        })
    }

    const companyDetail = await Company.findOne({ email: body.email })
    if (companyDetail) {
        const passwordMatch = await bcrypt.compare(body.password, companyDetail.password)
        if (passwordMatch) {

            // JWT
            let CompanyLogin = {
                companyId: null,
                status: false,
                message:null,
                token: null,
                name: null,
            };

            CompanyLogin.status = true;
            CompanyLogin.name = companyDetail.company_name;
            CompanyLogin.companyId = companyDetail._id;
            CompanyLogin.message = 'success';
            let token = jwt.sign({ id: companyDetail._id }, "secretCodeforUser", {
                expiresIn: "30d",
            });
            CompanyLogin.token = token;
            let name = companyDetail.company_name
            let obj = {
                token,
                name
            };

            return res.status(200).json({
                success: true,
                messege: 'Successfully Loged',
                obj: obj,
                CompanyLogin: CompanyLogin
            })
        } else {
            return res.status(400).json({
                success: false,
                error: 'Incorect User or Password'
            })
        }
    } else {
        return res.status(400).json({
            success: false,
            error: 'Incorect User or Password'
        })
    }
}
module.exports = { registration, login, companyCheck }