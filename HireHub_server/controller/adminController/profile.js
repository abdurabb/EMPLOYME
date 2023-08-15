const User = require('../../models/User')

const getProfileData = async(req,res)=>{
 try {
    const adminData = await User.find({isAdmin:true})
    if(adminData){
        return res.status(200).json({
            success:true,
            messege:'Success',
            data:adminData
        })
    }
 } catch (error) {
    return res.status(400).json({
        success:false,
        err:'something Wrong',
        error
    })
 }
}

const updateProfile = async (req,res)=>{
    try {
        const body = req.body.values
        if(body){
            const updateProfile = await User.findByIdAndUpdate({_id:body.id},{
                $set:{
                    first_name:body.first_name,
                    last_name:body.last_name,
                    email:body.email,
                    mobile:body.mobile,
                    dob:body.dob,
                    gender:body.gender
                }
            })

            if(updateProfile){
                return res.status(200).json({
                    success:true,
                    messege:'Succesfully Updated'
                })
            }
        }
    } catch (err) {
        return res.status(400).json({
            success:false,
            error:'Something Wrong',
            err
        })
    }
}
module.exports ={
    getProfileData,updateProfile
}