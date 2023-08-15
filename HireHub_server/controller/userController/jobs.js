const Job = require('../../models/Job')
const Application = require('../../models/Application')

// Getting all  JobData  for list in user side
const jobData = async (req, res) => {
    try {

        const appliedJobId = []

        if (req.query.id) {
            const applicationData = await Application.find({ user: req.query.id })
            applicationData.map((job) => {
                appliedJobId.push(job.job)
                return job.job
            });
        }

        const { title, location } = req.query;

        const queryData = {
            hiringClosed: false
        };

        if (title) {
            queryData.position = { $regex: new RegExp(title, 'i') }
        }
        if (location) {
            queryData.location = { $regex: new RegExp(location, 'i') }
        }

        const jobData = await Job.find(queryData).populate('company')

        return res.status(200).json({
            success: true,
            messege: 'Success',
            data: jobData,
            appliedJobId: appliedJobId
        })

    } catch (error) {

        return res.status(400).json({
            success: false,
            messege: 'Something Wrong',
            error: error
        })
    }
}


module.exports = {
    jobData
}