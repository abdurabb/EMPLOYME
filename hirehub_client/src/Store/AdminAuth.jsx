import { createSlice } from "@reduxjs/toolkit"

const AdminAuth = createSlice({

    name: 'admin',
    initialState: {
        adminToken: null,
        adminName: null,
        adminId: null
    },
    reducers: {
        adminAddDetails(state, actions) {
            const newItem = actions.payload;
            state.adminName = newItem.name
            state.adminToken = newItem.token
            state.adminId = newItem.adminId
        },
        adminLogout(state, actions) {
            state.adminName = null
            state.adminToken = null
            state.adminId = null
        }
    }

})

export const AdminActions = AdminAuth.actions
export default AdminAuth.reducer