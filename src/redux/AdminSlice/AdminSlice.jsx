import { createSlice } from "@reduxjs/toolkit";

export const adminSlice=createSlice({
    name:'admin',
    initialState:{
        id:"",
        username:"",
    },
    reducers:{
        updateAdmin:(state,action)=>{
            state.id = action.payload.id
            state.username=action.payload.username
           
        }
    }
})

export const {updateAdmin} = adminSlice.actions
export default adminSlice.reducer