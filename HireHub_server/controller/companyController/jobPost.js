const Job = require('../../models/Job')
const Company = require('../../models/Company')

// the Company Postiing the Jobs
const jobPost = async (req, res) => {
    const body = req.body.values
    try {

        if (!body || !req.body.id) {
            return res.status(400).json({
                success: false,
                error: 'No  Data',
            })
        }

        const companyData = await Company.findById({_id:req.body.id})
        if(companyData.Status !== 'Accept'){
            return res.status(400).json({
                success: false,
                error: 'You Have Not Get Approve',
            })
        }

        const job = new Job({
            position: body.position,
            subCategory: body.subCategory,
            qualification: body.qualification,
            skills: body.skills,
            jobDescription: body.jobDescription,
            location: body.location,
            salary: body.salary,
            company: req.body.id,
            experience: body.experience
        })

        const jobDetail = await job.save()
        if (jobDetail) {
            return res.status(200).json({
                success: true,
                messege: 'Succesfully Posted The Job',
            })
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong',
        })
    }
}

// Here Listing the Posted Jobs in Company Side 
const postedJobs = async (req, res) => {
    try {
        if (req.query) {

            const jobs = await Job.find({ company: req.query.id }).populate('company').sort({ Hiring_Date: -1 })
            if (jobs) {
                return res.status(200).json({
                    success: true,
                    messege: 'Success',
                    data: jobs
                })
            }
        }

    } catch (error) {
        console.log('err');
        return res.status(400).json({
            success: false,
            error: 'Something Wrong',
        })
    }
}

// Here Changing The Status of The Hiring, company can hire and close Hiring
const statusChange = async (req, res) => {
    try {

        const body = req.query

        if (body) {
            const data = await Job.findById({ _id: body.id })
            if (data && data.hiringClosed) {
                const update = await Job.findByIdAndUpdate({ _id: body.id }, { $set: { hiringClosed: false } })
            } else if (data && !data.hiringClosed) {
                const update = await Job.findByIdAndUpdate({ _id: body.id }, { $set: { hiringClosed: true } })
            }

            return res.status(200).json({
                success: true,
                error: 'successs',
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: 'Something Wrong',
        })
    }
}

// Here Getting Company Data By Id (findById)
const getDataById = async (req, res) => {
    try {
        const body = req.query
        if (body) {
            const jobData = await Job.findById({ _id: body.id })
            if (jobData) {
                return res.status(200).json({
                    success: true,
                    messege: 'success',
                    data: jobData
                })
            }
        }
    } catch (err) {
        return res.status(400).json({
            success: false,
            error: 'something Wrong',
            err
        })
    }
}

const editJob = async (req, res) => {
    try {
        const body = req.body.values
        if (body) {
            const update = await Job.updateMany({ _id: body.id },
                {
                    $set: {
                        position: body.position,
                        subCategory: body.subCategory,
                        qualification: body.qualification,
                        skills: body.skills,
                        jobDescription: body.jobDescription,
                        location: body.location,
                        salary: body.salary,
                        experience: body.experience
                    }
                })

                if(update){
                    return res.status(200).json({
                        success:true,
                        messege:'Succesfully Updated'
                    })
                }
        }
    } catch (error) {
        console.log('err founded'+error);
        return res.status(400).json({
            success: false,
            err: 'something Wrong',
            error
        })
    }
}

module.exports = {
    jobPost, postedJobs, statusChange, getDataById, editJob
}







