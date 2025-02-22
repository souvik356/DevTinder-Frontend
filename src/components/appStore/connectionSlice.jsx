import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : null
}

const connectionSlice = createSlice({
   name : "connection",
   initialState,
   reducers:{
    addConnection:(state,action)=>{
      state.value = action.payload
    },
    removeConnection :(state,action)=>{
      state.value = null
    }
   }
})

export const { addConnection,removeConnection } = connectionSlice.actions
export default connectionSlice.reducer