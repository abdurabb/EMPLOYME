import { createSlice } from "@reduxjs/toolkit"

const UserAuth = createSlice({
    name: "user",
    initialState: {
        userToken: null,
        userName: null,
        userId: null
    },
    reducers: {
        userAddDetails(state, actions) {
            const newItem = actions.payload;
            state.userName = newItem.name
            state.userToken = newItem.token
            state.userId = newItem.userId
        },
        userLogout(state, actions) {
            state.userName = null
            state.userToken = null
            state.userId = null
        }

    }
})

export const UserActions = UserAuth.actions
export default UserAuth.reducer