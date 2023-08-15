import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserApi } from '../../Api/UserApi'
import { UserActions } from '../../Store/UserAuth'

export const Authorization = ({ children, accessBy }) => {
    const user = useSelector((state) => state?.user?.userId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('UserToken')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (function () {
            if (accessBy === "Authorized") {
                if (user) {
                    setLoading(false);

                } else if (jwt) {

                    UserApi.get("/token_check").then((response) => {
                        if (response.data.status) {
                            const result = response.data.userLogin
                            dispatch(UserActions.userAddDetails({ name: result.name, token: jwt, userId: result.userId }))
                            setLoading(false);
                        }
                    });
                } else {
                    window.location.href = "/";
                }
            } else if (accessBy === "non-Authorized") {

                if (user) {
                    setLoading(false)
                } else if (jwt) {
                    UserApi.get("/token_check").then((response) => {
                        if (response.data.status) {
                            const result = response.data.userLogin
                            dispatch(UserActions.userAddDetails({ name: result.name, token: jwt, userId: result.userId }))
                            setLoading(false);
                        }
                    });
                }
            }
        }
        )();
    },[]);

    if (!loading && accessBy === "Authorized") {

        return children;
    } else if (!loading && accessBy === "non-Authorized") {
        console.log(!!loading);
        console.log(accessBy === "non-Authorized");
        navigate('/')
    } else if (loading && accessBy === "non-Authorized") {

        return children
    }

};