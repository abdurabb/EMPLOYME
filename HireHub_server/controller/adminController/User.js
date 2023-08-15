const User = require('../../models/User')

const userData = async (req, res) => {
    const userData = await User.find({ isAdmin: false })
    if (!userData) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong'
        })
    }

    return res.status(200).json({
        success: true,
        messege: 'Success',
        data: userData
    })
}
const blockHandle = async (req, res) => {
    
    if (!req.query.data) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong'
        })
    }
    
    const userData = await User.findOne({_id:req.query.data})
    if(userData.isBlocked){
        await User.findByIdAndUpdate({_id:req.query.data},{$set:{isBlocked:false}})
    }else{
        await User.findByIdAndUpdate({_id:req.query.data},{$set:{isBlocked:true}})
    }

    return res.status(200).json({
        success: true,
        messege:'Success'
    })
}
module.exports = {
    userData,
    blockHandle
}