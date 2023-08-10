import { createSlice } from "@reduxjs/toolkit"
 const INITIALSTATE={
    id:"",
    username:"",
    email:"",
    clubName:"",
}
export const UserSlice=createSlice({
    name:'user',
    initialState:INITIALSTATE,
   
    reducers:{
        updateUser:(state,action)=>{
            state.username=action.payload.username
            state.email=action.payload.email
            state.id=action.payload.id
            state.clubName=action.payload.clubName
        },
        logoutUser:(state)=>{
           Object.assign(state,INITIALSTATE)
        }
    }
})
export const {updateUser,logoutUser} =UserSlice.actions
export default UserSlice.reducer