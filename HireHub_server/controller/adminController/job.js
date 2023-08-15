const Job = require('../../models/Job')


const jobData = async (req, res) => {

    try {
        const jobData = await Job.find({ hiringClosed: false }).populate('company')
        
            
            return res.status(200).json({
                success: true,
                messege: 'success',
                jobData: jobData
            })
        
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'something Wrong',
            
        })
    }
}
module.exports = {
    jobData
}