const Company = require('../../models/Company')

const companyData = async (req, res) => {
    const companyData = await Company.find()

    if (!companyData) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong'
        })
    }

    return res.status(200).json({
        success: true,
        messege: 'Success',
        data: companyData
    })

}

const approve = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({
                success: false,
                error: 'Something Wrong'
            })
        }

        const { event, id } = req.body;
        const updated = await Company.findByIdAndUpdate({ _id: id }, { Status: event })
        if (updated) {
            return res.status(200).json({
                success: true,
                messege: 'success',
                applicationStatus: updated.Status
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            err: 'something Wrong',
            error: error
        })
    }


}

module.exports = {
    companyData, approve
}