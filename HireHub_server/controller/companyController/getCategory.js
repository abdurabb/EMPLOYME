const Category = require('../../models/Category')

const categoryGet = async (req, res) => {
    const category = await Category.find({})
    if (!category) {
        return res.status(400).json({
            success: false,
            error: 'No Category Data',
        })
    }

    return res.status(200).json({
        success: true,
        messege: 'success',
        data: category
    })
}

module.exports = { categoryGet }