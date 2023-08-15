
const tokenCheck = async (req, res) => {
    try {
        const user = req.user;
        let userLogin = {
            userId: null,
            status: false,
            message: null,
            name: null,
        };

        if(user){
            userLogin.userId = user._id;
            userLogin.status = true,
            userLogin.message = 'success',
            userLogin.name = user.first_name
        }

        if(userLogin){
            return res.status(200).json({
                success:true,
                status:true,
                userLogin:userLogin
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