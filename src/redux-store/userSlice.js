import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import getAxiosReqWithToken from '../components/AxiosReqWithToken'
import { decrypt, encrypt } from "../components/Authorization&Encryption/EncryptingData";

export const userLogin = createAsyncThunk('loginUser', async(userCredentialsObj,thunkApi)=>{
    let data
    // if user is user
    if(userCredentialsObj.userType === 'user')
    {
        let response = await axios.post('/users/login', userCredentialsObj)
        console.log(response)
        data = response.data
    }                                                                                                                                                                          
    // if user is admin
    if(userCredentialsObj.userType === 'admin'){
        let response = await axios.post('/admin/login', userCredentialsObj)
        console.log(response)
        data = response.data
    }
 
  if(data.message === 'success'){
      localStorage.setItem("token", data.token)
      return data.user
  }
  if(data.message === 'Invalid username' || data.message === 'Invalid password'){
      return thunkApi.rejectWithValue(data);
  }
})
// Edit Profile pic 
export const editProfilePicture = createAsyncThunk(
    "Edit Pic",
    async ({ formData, userType }, thunkAPI) => {
      let axiosReqWithToken = getAxiosReqWithToken();
      let response;
      // for User
      if (userType === "user") {
        response = await axiosReqWithToken.put("/users/editprofilepic", formData);
      }
      // for Admin 
      if (userType === "admin") {
        response = await axiosReqWithToken.put("/admin/editprofilepic", formData);
      }
      let data = response.data;
      if (data.message === "updated") {
        localStorage.setItem("userObj", data.payload);
        let decryptedUser = decrypt(data.payload);
        return decryptedUser;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    }
  );

  export const editUserProfile = createAsyncThunk(
    "editUserProfile",
    async (user, thunkAPI) => {
      let axiosReqWithToken = getAxiosReqWithToken();
      let response;
      let encryptedUser = encrypt(user);
      // for Admin
      if (user.userType === 'admin') {
        response = await axiosReqWithToken.put("/admin/edituserprofile", {
          encryptedUser: encryptedUser,
        });
      }
      // for User
      if (user.userType === 'user') {
        response = await axiosReqWithToken.put("/users/edituserprofile", {
          encryptedUser: encryptedUser,
        });
      }
      let data = response.data;
      if (data.message === "updated") {
        localStorage.setItem("userObj", data.payload);
        let decryptedUser = decrypt(data.payload);
        alert("User Updated");
        return decryptedUser;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    }
  );

const userSlice = createSlice({
    name:"user",
    initialState:{
        userObj:{},
        isSuccess:false,
        isLoading: false,
        isError:false,
        invalidLoginMessage:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
          state.userObj = {}
          state.isSuccess = false
        return state}
    },
    
    extraReducers:{
        [userLogin.fulfilled]:(state,action)=>{
            state.userObj = action.payload
            state.isSuccess = true
        },
        [userLogin.pending]:(state,action)=>{
            state.isLoading = true
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError = true
            state.isLoading = false
            state.invalidLoginMessage = action.payload.message
        },
        [editProfilePicture.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
          },
          [editProfilePicture.rejected]: (state, action) => {
            state = Object.assign(state, {
              isSuccess: false,
              isError: true,
              isLoading: false,
              invalidMessage: action.payload,
            });
          },
          [editUserProfile.fulfilled]: (state, action) => {
            state.userObj = action.payload;
            state.isSuccess = true;
            state.isLoading = false;
            state.invalidLoginMessage = "";
            state.isError = false;
          },
          [editUserProfile.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false;
          },
          [editUserProfile.rejected]: (state, action) => {
            state = Object.assign(state, {
              isSuccess: false,
              isError: true,
              isLoading: false,
              invalidMessage: action.payload.message,
            });
          },

    }
})
export const {clearLoginStatus, reLogin} = userSlice.actions

export default userSlice.reducer