import { createSlice } from "@reduxjs/toolkit"

export const UserSlice=createSlice({
    name:'user',
    initialState:{
        id:"",
        username:"",
        email:""
    },
    reducers:{
        updateUser:(state,action)=>{
            state.username=action.payload.username
            state.email=action.payload.email
            state.id=action.payload.id
        }
    }
})
export const {updateUser} =UserSlice.actions
export default UserSlice.reducer