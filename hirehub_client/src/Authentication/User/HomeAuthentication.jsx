import { useDispatch, useSelector } from "react-redux"
import { UserApi } from '../../Api/UserApi'
import { UserActions } from '../../Store/UserAuth'
import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"



export const HomeVerification = ({ children }) => {
    // const navigate = useNavigate()
    const user = useSelector((state) => state?.user?.userId);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('UserToken')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (function () {
            if (user) {
                return setLoading(false)
            } else if (jwt) {
                
                UserApi.get("/token_check").then((response) => {
                    if (response.data.status) {
                        const result = response.data.userLogin
                        dispatch(UserActions.userAddDetails({ name: result.name, token: jwt, userId: result.userId }))
                        
                        setLoading(false);
                    }
                })
            }else{
                setLoading(false)
            }
        })()

    }, [])

    if (!loading) return children
    else return null
    
}