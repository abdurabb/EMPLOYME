
const tokenCheck = async (req, res) => {
    try {
        const user = req.user;
        let adminLogin = {
            adminId: null,
            status: false,
            message: null,
            token: null,
            name: null,
        };

        if(user){
            adminLogin.adminId = user._id;
            adminLogin.status = true,
            adminLogin.message = 'success',
            adminLogin.name = user.first_name
        }

        if(adminLogin){
            return res.status(200).json({
                success:true,
                status:true,
                adminLogin:adminLogin
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