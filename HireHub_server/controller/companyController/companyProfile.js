const Company = require('../../models/Company')

// here getting company Profile Data by using company Id
const getProfile = async (req, res) => {

    try {
        const companyData = await Company.findById({ _id: req.query.id })
        if (companyData) {
            return res.status(200).json({
                success: true,
                messege: 'Success',
                data: companyData
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong',
        })
    }
}

const updateImage = async (req, res) => {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({
                success: false,
                messege: 'Something Wrong'
            })
        }

        const imageChange = await Company.findByIdAndUpdate({ _id: body.id }, { $set: { Image: body.url } })
        if (imageChange) {
            return res.status(200).json({
                success: true,
                messege: 'Succesfully Image Updated'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong'
        })
    }
}

const updateProfile = async (req, res) => {
    const body = req.body.values

    try {

        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Data',
            })
        }

        const companyUpdate = await Company.updateMany({ _id: body.id },
            {
                $set: {
                    company_name: body.company_name,
                    gstNumber: body.gstNumber,
                    email: body.email,
                    gender: body.gender,
                    email: body.email,
                    mobile: body.mobile,
                    category: body.category,
                    address: body.address,
                    licence: body.licence,
                    employeeNumber: body.employeeNumber,
                    country: body.country,
                }
            })

        if (companyUpdate) {
            return res.status(200).json({
                success: true,
                messege: 'Successfully Updated'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong'
        })
    }
}

module.exports = {
    getProfile, updateImage, 
    updateProfile
}