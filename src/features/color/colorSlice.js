import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { colorService } from "./colorService";

const initialState={
    colors:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}

const getAllColor=createAsyncThunk("color/getAll",async(thunkAPI)=>{
    try {
        return await colorService.getAllColor()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data.response.message)
    }
})

export const colorSlice = createSlice({
    name:"color",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllColor.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllColor.fulfilled,(state,action)=>{
            state.isLoading=true
            state.isSuccess=true
            state.colors=action.payload
        }).addCase(getAllColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(state.message)
        })
    }
})

export default colorSlice.reducer;

export {getAllColor}