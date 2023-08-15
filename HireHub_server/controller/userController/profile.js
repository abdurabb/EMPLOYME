const User = require('../../models/User')

// Here Getting Profile Data 
const profileData = async (req, res) => {
    try {
        const userData = await User.findById({ _id: req.query.id })
        if (userData) {
            return res.status(200).json({
                success: true,
                messege: 'Success',
                data: userData
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong',
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

        const userUpdate = await User.updateMany({ _id: body.id },
            {
                $set: {
                    first_name: body.firstName,
                    last_name: body.lastName,
                    dob: body.dob,
                    gender: body.gender,
                    email: body.email,
                    mobile: body.phone,
                    qualification: body.qualification,
                    address: body.address,
                    post: body.post,
                    district: body.district,
                    state: body.state,
                    country: body.country,
                    zipCode: body.zipCode
                }
            })

        if (userUpdate) {
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

const updateImage = async (req, res) => {
    try {
        const body = req.body;
        if (!body) {
            return res.status(400).json({
                success: false,
                messege: 'Something Wrong'
            })
        }

        const imageChange = await User.findByIdAndUpdate({ _id: body.id }, { $set: { Image: body.url } })
        if (imageChange) {
            return res.status(200).json({
                success: true,
                messege: 'Succesfully Updated'
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
    profileData, updateProfile, updateImage
}