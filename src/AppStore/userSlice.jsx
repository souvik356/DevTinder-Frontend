import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : []
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        addUser : (state,action)=>{
          state.value = action.payload
        },
        removeUser : (state,action)=>{
            state.value = []
        }
    }
})

export const { addUser,removeUser } = userSlice.actions

export default userSlice.reducer