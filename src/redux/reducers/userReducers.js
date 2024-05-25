import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from '../api.js';




const initialState={
    // user ID retrieved from local storage or defaults to null
    userID:localStorage.getItem('userID')||null,
    userToken:localStorage.getItem('user')||null,
    userName:localStorage.getItem('userName')||null,
    userType:localStorage.getItem('userType')||null,
    loading:false,
    errorMsg:null,
    successMsg:null
}
// Async thunk functions for sign up, sign in, and sign out
export const signUpAsync=createAsyncThunk("user/signup",async(payload,{rejectWithValue})=>{
    try {
       console.log(payload);
       await axios.post("/users/signup", {
            name:payload.name,
            email:payload.email,
            password:payload.password,
            type:payload.userType
        });
        
        return ;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const signInAsync=createAsyncThunk("user/signin",async(payload,{rejectWithValue})=>{
    try {
       console.log(payload);
      const response= await axios.post("/users/signin", {
            email:payload.email,
            password:payload.password
        });
        console.log(response);
        // axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
        // console.log('Authorization header:', axios.defaults.headers.common['Authorization']);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})
export const getUserData=createAsyncThunk("user/getData",async(_,{rejectWithValue})=>{
    try {
        const response=await axios.get("/users");
    console.log("getUserData ",response);
    return response.data; 
    } catch (error) {
        return rejectWithValue(error.message);
    }
   
})

//User Slice Creation
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        clearMsg:(state)=>{ // Action to clear success and error messages
            state.successMsg=null;
            state.errorMsg=null;
           },
        signOut:(state)=>{
            localStorage.removeItem('user');
            localStorage.removeItem('userID');
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            delete axios.defaults.headers.common['Authorization'];
            console.log("User Signed Out Successfully !");
            return{
                ...state,
                userToken:null,
                successMsg:"User Signed Out Successfully !",
                errorMsg:null,
                userID:null,
                userName:null,
                userType:null
             }
        }   
    },
    extraReducers:(builder)=>{
        builder.addCase(signUpAsync.fulfilled,(state)=>{
            console.log("User Signed Up Successfully!");
            return{
                ...state,
               successMsg:"User Signed Up Successfully!",
               errorMsg:null
         }
           
         })
         .addCase(signUpAsync.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
            return{
                ...state,
                successMsg:null,
                errorMsg:errorMessage,
                loading:false,
            }  
           
         })
         .addCase(signInAsync.fulfilled,(state,action)=>{
            console.log("User Signed In Successfully! ",action.payload);
            localStorage.setItem('user',action.payload);
            return{
                ...state,
                userToken:action.payload,
               successMsg:"User Signed In Successfully!",
               errorMsg:null
         }
           
         })
         .addCase(signInAsync.rejected,(state,action)=>{
            const {payload}=action;
            const errorMessage = typeof payload === 'string' ? payload : 'Error:Check Credential!';
            console.log(errorMessage);
            return{
                ...state,
                successMsg:null,
                errorMsg:errorMessage,
                loading:false,
            }  
           
         })
         .addCase(getUserData.fulfilled,(state,action)=>{
            const {name,type,_id}=action.payload;
            localStorage.setItem('userID',_id);
            localStorage.setItem('userName',name);
            localStorage.setItem('userType',type);
            return{
                ...state,
                userID:_id,
                userName:name,
                userType:type
            }
         })
    }
})


// Exporting reducer and actions
export const userReducer=userSlice.reducer;
export const userActions=userSlice.actions;

// Selector to retrieve user state from the Redux store
export const userSelector=(state)=>state.userReducer;