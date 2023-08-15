
const tokenCheck = async (req, res) => {
    try {
        
        const company = req.company;
        let companyLogin = {
            companyId: null,
            status: false,
            message: null,
            name: null,
        };

        if (company) {
            companyLogin.companyId = company._id;
            companyLogin.status = true,
            companyLogin.message = 'success',
            companyLogin.name = company.company_name
        }

        if (companyLogin) {
            
            return res.status(200).json({
                success: true,
                status: true,
                companyLogin: companyLogin
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            messege: 'something wrong'
        })
    }


}
module.exports = {
    tokenCheck
}