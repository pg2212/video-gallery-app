import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'

import getAxiosReqWithToken from '../components/AxiosReqWithToken'

export const getVideoDetails = createAsyncThunk("getContent", async(_,thunkApi)=>{
    let axiosReqWithToken = getAxiosReqWithToken()
    let response = await axiosReqWithToken.get("/content/getcontent")
    console.log("response", response)
    let data = response.data
    let payload = data.payload
    console.log("abcd")
    console.log(payload)
    if(data.message === "success")
    {
        return payload;
    }
    else{
        return thunkApi.rejectWithValue(data)
    }
})
export const addContent = createAsyncThunk(
    "addContent",
    async (formData, thunkAPI) => {
      let axiosReqWithToken = getAxiosReqWithToken()
      let response = await axiosReqWithToken.post(
        "/content/addcontent",
        formData
      );
      let data = response.data;
      if (data.message === "New Content Created") {
        alert(data.message);
        return data;
      } else {
        alert(data.message);
        return thunkAPI.rejectWithValue(data);
      }
    }
  );
  export const deleteContent = createAsyncThunk(
    "deleteContent",
    async (videoObj, thunkAPI) => {
      let axiosReqWithToken = getAxiosReqWithToken()
      let { videoName } = videoObj;
      let response = await axiosReqWithToken.delete(
        `/content/deletecontent/${videoName}`
      );
      let data = response.data;
      if (data.message === "deleted") {
        return data;
      } else {
        // it will provide data to rejected state
        return thunkAPI.rejectWithValue(data);
      }
    }
  );
  export const editContent = createAsyncThunk(
    "editContent",
    async ({ formData, index }, thunkAPI) => {
      let axiosReqWithToken = getAxiosReqWithToken()
      let response = await axiosReqWithToken.put(
        "/content/editcontent",
        formData
      );
      let data = response.data;
      if (data.message === "updated") {
        alert(data.message);
        return thunkAPI.fulfillWithValue({ payload: data.payload, index });
      } else {
        // it will provide data to rejected state
        return thunkAPI.rejectWithValue(data);
      }
    }
  );
    const contentSlice = createSlice({
        name: "video",
        initialState:{
            videoObj:[],
            isSuccess:false,
            isLoading: false,
            isError:false,
            invalidMessage:''
        },
        reducers:{
            clearVideoStatus: (state) => {
                state.isSuccess = false;
                state.videoObj = [];
                return state;
              },
        },
        extraReducers:{
            [getVideoDetails.fulfilled]: (state,action) =>{
                state.videoObj = action.payload
                state.isSuccess = true
            },
            [getVideoDetails.pending]:(state,action)=>{
                state.isLoading = true;
            },
            [getVideoDetails.rejected]: (state, action)=>{
                state.isError = true;
                state.isLoading = false;
                state.invalidMessage = action.payload.message
            },
            [deleteContent.fulfilled]: (state, action) => {
      state.videoObj.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [deleteContent.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [deleteContent.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
    [addContent.fulfilled]: (state, action) => {
      state.videoObj.push(action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [addContent.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [addContent.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
    [editContent.fulfilled]: (state, action) => {
      state.videoObj.splice(
        action.payload.index,
        1,
        action.payload.payload
      );
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
      state.isError = false;
    },
    [editContent.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
    },
    [editContent.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidMessage = action.payload.message;
    },
        }
        
    })
    export const { clearVideoStatus } = contentSlice.actions;

export default contentSlice.reducer