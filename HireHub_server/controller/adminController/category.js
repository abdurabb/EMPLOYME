const Category = require('../../models/Category')

// Here Creating the New Categoryies
const createCategory = async (req, res) => {
    try {

        const body = req.body
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide a Data',
            })
        }

        const category = new Category({
            name: body.values.name,
            description: body.values.description
        })

        const categoryData = await category.save()
        if (categoryData) {
            return res.status(200).json({
                success: true,
                messege: 'Successfully Created',
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Somthing Wrong',
        })
    }


}

// Here all CategoryData Get for print in admin page
const categoryData = async (req, res) => {
    const categoryData = await Category.find({ is_delete: false })
    if (!categoryData) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong'
        })
    }

    return res.status(200).json({
        success: true,
        messege: 'success',
        data: categoryData
    })
}

// Here CategoryData Getting By Id
const getCategory = async (req, res) => {
    const id = req.query.queryParam;
    const category = await Category.find({ _id: id })
    if (!category) {
        return res.status(400).json({
            success: false,
            error: 'something Wron'
        })
    }

    return res.status(200).json({
        success: true,
        messege: 'Category founded',
        categoryData: category
    })
}
// Here Updating The Category From Admin
const updateCategory = async (req, res) => {
    const body = req.body.values;
    try {
        if (body) {
            const updateCategory = await Category.findByIdAndUpdate({ _id: body.id }, { name: body.name, description: body.description })
            if (updateCategory) {
                return res.status(200).json({
                    success: true,
                    messege: 'Successfully Updated',
                })
            }
        }
    } catch (error) {
        console.log('err', error);
        return res.status(400).json({
            success: false,
            error: 'Somthing Wrong'
        })
    }

}

const deleteCategory = async (req, res) => {

    Category.findByIdAndDelete({ _id: req.query.data }).then((result) => {
        return res.status(200).json({
            success: true,
            messege: 'Succesfully Deleted'
        })
    }).catch((err) => {
        return res.status(400).json({
            success: false,
            error: 'Somthing Wrong'
        })
    })
}
module.exports = { createCategory, categoryData, getCategory, updateCategory, deleteCategory }