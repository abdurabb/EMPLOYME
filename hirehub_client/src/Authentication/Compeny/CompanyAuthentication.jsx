import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CompanyApi } from '../../Api/CompanyApi'
import { CompanyActions } from '../../Store/CompanyAuth'

export const CompanyAuthorization = ({ children, accessBy }) => {
    const company = useSelector((state) => state?.company?.companyId);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem('CompanyToken')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (function () {
            if (accessBy === "Authorized") {
               
                if (company) {
                    setLoading(false);

                } else if (jwt) {

                    CompanyApi.get("/token_check").then((response) => {
                    
                        if (response.data.status) {
                            const result = response.data.companyLogin
                            console.log(result);
                            dispatch(CompanyActions.companyAddDetails({ name: result.name, token: jwt, companyId: result.companyId }))
                            setLoading(false)
                        }
                    });
                } else {
                    window.location.href = "/";
                }
            } else if (accessBy === "non-Authorized") {
                
                if (company) {
                    setLoading(false)
                } else if (jwt) {
                    CompanyApi.get("/token_check").then((response) => {
                        if (response.data.status) {
                            const result = response.data.companyLogin
                            dispatch(CompanyActions.companyAddDetails({ name: result.name, token: jwt, companyId: result.companyId }))
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