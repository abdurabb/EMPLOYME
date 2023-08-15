const Premium = require('../../models/PremiumPlan')

// Create New Premium
const createPremium = async (req, res) => {
    try {
        const body = req.body.values
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'Something wrong'
            })
        }

        const premium = new Premium({
            planName: body.planName,
            description: body.description,
            planPrice: body.planPrice,
            planDuration: {
                value: body.valid,
                unit: body.unit
            }
        })
        const premiumData = await premium.save()
        if (premiumData) {
            return res.status(200).json({
                success: true,
                messege: 'Succesfully Created'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Something wrong'
        })
    }

}

// Get All Premium Data 
const premiumDataGet = async (req, res) => {
    try {
        const premiumData = await Premium.find({})
        if (premiumData) {
            return res.status(200).json({
                success: true,
                messege: 'Success',
                data: premiumData
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'somthing Wrong',
        })
    }
}

// Get Premium Data By Id 
const premiumDataGetById = async (req, res) => {

    try {
        if (req.query) {
            const premiumData = await Premium.findById({ _id: req.query.id })
            if (premiumData) {
                return res.status(200).json({
                    success: true,
                    messege: 'Success',
                    data: premiumData
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'somthing Wrong',
        })
    }
}

// Here Deleting The Premium , Delete by Id
const deletePremium = async (req, res) => {
    try {
        if (req.query) {

            const premiumDelete = await Premium.findByIdAndDelete({ _id: req.query.id })
            if (premiumDelete) {
                return res.status(200).json({
                    success: false,
                    messege: 'Successfully Deleted'
                })
            }
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            messege: 'Something Wrong'
        })
    }
}

// here Updating the Premium Active or Non Active
const activePremium = async (req, res) => {
    try {

        if (req.query) {
            const premium = await Premium.findById({ _id: req.query.id })

            if (premium.isActive == 'true') {
                const updateTrue = await Premium.findByIdAndUpdate({ _id: req.query.id }, { $set: { isActive: false } })
            } else {
                const updateFalse = await Premium.findByIdAndUpdate({ _id: req.query.id }, { $set: { isActive: true } })
            }


            return res.status(200).json({
                success: true,
                messege: 'succesfully Updated'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong'
        })
    }
}

// Here Admin Updating The Premium
const updatePremium = async (req, res) => {
    try {
        const body = req.body.values
        if (body) {
            const updatePremium = await Premium.updateMany({_id:body.id},{$set:{
                planName:body.planName,
                description:body.description,
                planPrice:body.planPrice,
                planDuration:{
                    value:body.valid,
                    unit:body.unit
                }
            }})

            if(updatePremium){
                return res.status(200).json({
                    success:true,
                    messege:'Successfully Updated'
                })
            }
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'Something Wrong'
        })
    }
}

module.exports = {
    createPremium, premiumDataGet, deletePremium, activePremium, premiumDataGetById
    , updatePremium
}