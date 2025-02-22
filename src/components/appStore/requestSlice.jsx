import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null
}

const request = createSlice({
    name : "request",
    initialState,
    reducers :{
        addRequest: (state,action)=>{
          state.value = action.payload
        },
        removeRequest:(state,action)=> {
          state.value.splice(action.payload,1)
        }
    }
})

export const { addRequest,removeRequest } = request.actions
export default request.reducer