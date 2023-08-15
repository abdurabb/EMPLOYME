import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminApi } from '../../Api/AdminApi'
import { AdminActions } from '../../Store/AdminAuth'

export const AdminAuthorization = ({ children, accessBy }) => {
    const user = useSelector((state) => state?.admin?.adminId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('AdminToken')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (function () {
            if (accessBy === "Authorized") {
                if (user) {
                    setLoading(false);

                } else if (jwt) {

                    AdminApi.get("/token_check").then((response) => {
                        if (response.data.status) {
                            const result = response.data.adminLogin
                            dispatch(AdminActions.adminAddDetails({ name: result.name, token: jwt, adminId: result.adminId }))
                            setLoading(false);
                        }
                    });
                } else {
                    window.location.href = "/admin";
                }
            } else if (accessBy === "non-Authorized") {

                if (user) {
                    setLoading(false)
                } else if (jwt) {
                    AdminApi.get("/token_check").then((response) => {
                        if (response.data.status) {
                            const result = response.data.adminLogin
                            dispatch(AdminActions.adminAddDetails({ name: result.name, token: jwt, adminId: result.adminId }))
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