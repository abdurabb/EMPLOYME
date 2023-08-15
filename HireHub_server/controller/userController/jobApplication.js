
const Application = require('../../models/Application')


// here User Appliying to New Job
const applyJob = async (req, res) => {

    try {
        const body = req.body;
        if (body) {

            const application = new Application({
                skill: body.values.skill,
                experience: body.values.experience,
                plusTwo: body.values.plustwo,
                degree: body.values.degree,
                otherQualification: body.values.otherQualification,
                sslcCertificate: body.urlData.sslcUrl,
                plusTwoCertificate: body.urlData.plusTwoUrl,
                degreeCertificate: body.urlData.degreeUrl,
                otherQualificationCertificate: body.urlData.otherUrl,
                cv: body.urlData.cvUrl,
                user: body.user,
                job: body.job
            })

            const applicationData = await application.save()
            if (applicationData) {
                return res.status(200).json({
                    success: true,
                    message: 'Your Application Success'
                })
            }
        }
    } catch (error) {
        console.log('ehloo');
        return res.status(400).json({
            success: false,
            messege: 'something wrong',
            error: err
        })
    }
}

const ApplicationList = async (req, res) => {
    try {

        const query = req.query.id
        if (query) {
            // const data = await Application.find({ user: query }).populate('job')

            const data = await Application.find({ user: query })
                .populate({
                    path: 'job',
                    populate: {
                        path: 'company',
                        // model: 'Company'
                    }
                });


            if (data) {
                return res.status(200).json({
                    success: true,
                    messege: 'success',
                    data: data,
                })
            }
        }
    } catch (error) {
        console.log('err err');
        return res.status(400).json({
            success: false,
            err: 'something Wrong',
            error: error
        })
    }
}

module.exports = {
    applyJob, ApplicationList
}