import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { categoryService } from "./categoryService";
import { toast } from "react-toastify";

const initialState={
    categories:null,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:''
}

const getAllCateg=createAsyncThunk("category/getAll",async(thunkAPI)=>{
    try {
        return await categoryService.getAllCateg()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data.response.message)
    }
})

export const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCateg.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllCateg.fulfilled,(state,action)=>{
            state.isLoading=true
            state.isSuccess=true
            state.categories=action.payload
        }).addCase(getAllCateg.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(state.message)
        })
    }
})

export default categorySlice.reducer;

export {getAllCateg}