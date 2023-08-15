import { createSlice } from "@reduxjs/toolkit"

const CompanyAuth = createSlice({

    name: 'company',
    initialState: {
        companyToken: null,
        companyName: null,
        companyId: null
    },
    reducers: {
        companyAddDetails(state, actions) {
            const newItem = actions.payload;
            state.companyName = newItem.name
            state.companyToken = newItem.token
            state.companyId = newItem.companyId 
        },
        companyLogout(state, actions) {
            state.companyName = null
            state.companyToken = null
            state.companyId = null
        }
    }

})

export const CompanyActions = CompanyAuth.actions
export default CompanyAuth.reducer