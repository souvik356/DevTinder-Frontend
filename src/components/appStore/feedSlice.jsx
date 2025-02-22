import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value : null
}
const feedSlice = createSlice({
    name : 'feed',
    initialState  ,
    reducers : {
        addFeed : (state,action)=>{
           state.value = action.payload
        },
        removeUserFeed : (state,action)=>{
          state.value.splice(action.payload,1)
        }
    }
})

export const { addFeed,removeUserFeed } = feedSlice.actions
export default feedSlice.reducer