import { useDispatch, useSelector } from "react-redux"
import { CompanyApi } from '../../Api/CompanyApi'
import { CompanyActions } from '../../Store/CompanyAuth'
import { useEffect, useState } from "react"


export const CompanyHomeVerification = ({ children }) => {
    const company = useSelector((state) => state?.company?.companyId);
    console.log(company);
    const dispatch = useDispatch()
    const jwt = localStorage.getItem('CompanyToken')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (function () {
            if (company) {
                return setLoading(false)
            } else if (jwt) {

                CompanyApi.get("/token_check").then((response) => {
                    if (response.data.status) {
                        const result = response.data.companyLogin
                        dispatch(CompanyActions.companyAddDetails({ name: result.name, token: jwt, userId: result.companyId }))

                        setLoading(false);
                    }
                })
            } else {
                setLoading(false)
            }
        })()

    }, [])

    if (!loading) return children
    else return null

}