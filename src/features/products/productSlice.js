import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import { productService } from "./productService"
import { toast } from "react-toastify"

const initialState={
    products:null,
    isError:false,
    isSuccess:false,
    message:"",
    wishlist:[],
    isLoading:false
}

const getAllProducts = createAsyncThunk("product/getAll",async(data,thunkAPI)=>{
    try {
        return await productService.getAllProducts(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const addToWishlist = createAsyncThunk("product/addToWishlist",async(id,thunkAPI)=>{
    try {
        return await productService.addToWishlist(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})
const getAProduct = createAsyncThunk("product/getProduct",async(id,thunkAPI)=>{
    try {
        return await productService.getAProduct(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const getWishList = createAsyncThunk("product/getWishlist",async(thunkAPI)=>{
    try {
        return await productService.getWishList()
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data.response.message)
    }
})

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.products=action.payload
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(state.message)
        })
        .addCase(getWishList.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist = action.payload
        })
        .addCase(getWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(state.message)
        })
        .addCase(addToWishlist.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(addToWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishlist = action.payload.wishlist
            state.message = action.payload.message
            toast.success(state.message)
        })
        .addCase(addToWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(state.message)
        })
        .addCase(getAProduct.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.aproduct = action.payload
        })
        .addCase(getAProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload;
            toast.error(state.message)
        })
    }
})

export {getAllProducts,addToWishlist,getWishList,getAProduct}

export default productSlice.reducer;