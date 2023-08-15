const Application = require('../../models/Application')
const Job = require('../../models/Job')


// here getting the Application and candidates data to company page
const getCandidates = async (req, res) => {
    try {
        if (req.query) {
            const jobs = await Job.find({ company: req.query.id })
            const applications = await Application.find({ job: { $in: jobs.map(job => job._id) } }).populate('user').populate('job')

            if (applications) {
                return res.status(200).json({
                    success: true,
                    messege: 'success',
                    data: applications,
                })
            }
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            err: 'something Wrong',
            error: error
        })
    }

}
// Here Updating Status 
const updateStatus = async (req, res) => {
    const { event, id } = req.body;
    try {
        const updated = await Application.findByIdAndUpdate({_id:id},{Status:event})
        if(updated){
            return res.status(200).json({
                success: true,
                messege: 'success',
                applicationStatus:updated.Status
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
    getCandidates, updateStatus
}