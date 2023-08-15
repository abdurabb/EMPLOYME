const Category = require('../../models/Category')
const User = require('../../models/User')
const Company = require('../../models/Company')
const Premium = require('../../models/PremiumPlan')

// Here Getting the all dashboard Datas
const fetchDatas = async (req, res) => {
    try {
        const categoryData = await Category.find()
        const userData = await User.find({isAdmin:false})
        const companyData = await Company.find()
        const plans = await Premium.find()

        return res.status(200).json({
            success:true,
            messege:'Success',
            categoryData,
            userData,
            companyData,
            plans
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'something Wrong',

        })
    }
}

module.exports = {
    fetchDatas
}