import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    value : []
}

const userSLice = createSlice({
    name : 'User',
    initialState,
    reducers :{
        addUser : (state,action)=>{
            state.value = action.payload
        },
        removeUser : (state,action)=>{
            state.value = []
        }
    }
})

export const { addUser,removeUser } = userSLice.actions
export default userSLice.reducer
