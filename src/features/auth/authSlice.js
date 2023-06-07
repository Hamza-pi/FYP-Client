import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import { authService } from "./authService";
import {toast} from "react-toastify"

const user= JSON.parse(localStorage.getItem("user"))
const compares = JSON.parse(localStorage.getItem("compare"))

const userInitialState = user?user:null
const comparesInitialState = compares?compares:[]

const initialState={
    user:userInitialState,
    cart:[],
    orders:[],
    compare:comparesInitialState,
    subTotal:0,
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:""
}

const register = createAsyncThunk("auth/register",async(data,thunkAPI)=>{
    try {
        return await authService.registerUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const login = createAsyncThunk("auth/login",async(data,thunkAPI)=>{
    try {
        return await authService.loginUser(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


const addToCart = createAsyncThunk("auth/addToCart",async(data,thunkAPI)=>{
    try {
       return await authService.addToCart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const getCart = createAsyncThunk("auth/getCart",async(data,thunkAPI)=>{
    try {
        return await authService.getCart()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const removeCartItem = createAsyncThunk("auth/removeCartItem",async(id,thunkAPI)=>{
    try {
        return await authService.removeCartItem(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const updateCartItem = createAsyncThunk("auth/updateCartItem",async(data,thunkAPI)=>{
    try {
        return await authService.updateCart(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})
const placeOrder = createAsyncThunk("auth/placeOrder",async(data,thunkAPI)=>{
    try {
        return await authService.createOrder(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})

const getOrders = createAsyncThunk("auth/getOrders",async(data,thunkAPI)=>{
    try {
        return await authService.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message)
    }
})


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logOut:(state)=>{
            state.user=null;
            localStorage.removeItem("user")
            toast.success("Logged Out Successfully")
        },
        addToCompare: (state, action) => {
            state.compare = [...state.compare, action.payload];
            localStorage.setItem("compare",JSON.stringify(state.compare))
            toast.success("Added To Compare")
        },
        removeFromCompare:(state,action)=>{
           state.compare=state.compare.filter((item)=>item._id!==action.payload._id)
           localStorage.setItem("compare",JSON.stringify(state.compare))
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.message = action.payload.message
            toast.success(state.message)
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.user=null;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(addToCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(addToCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart=action.payload.cart
            state.subTotal=0;
            state.cart.forEach((item)=>{
                state.subTotal+=item.total
            })
            state.message = action.payload.message
            toast.success(state.message)
        })
        .addCase(addToCart.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(getCart.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getCart.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart = action.payload
            state.subTotal=0;
           if(state.cart.length>0){
            state.cart.forEach((item)=>{
                state.subTotal+=item.total
            })
           }
        })
        .addCase(getCart.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(removeCartItem.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(removeCartItem.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart = action.payload.cart
            state.subTotal=0
            state.cart.forEach((item)=>{
                state.subTotal+=item.total
            })
            state.message = action.payload.message
            toast.success(state.message)
        })
        .addCase(removeCartItem.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(updateCartItem.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(updateCartItem.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.cart = action.payload.cart
            state.subTotal=0
            state.cart.forEach((item)=>{
                state.subTotal+=item.total
            })
            state.message = action.payload.message
            toast.success(state.message)
        })
        .addCase(updateCartItem.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(placeOrder.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(placeOrder.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orders = action.payload.order
            state.cart = action.payload.cart
            state.subTotal=0
            state.cart.forEach((item)=>{
                state.subTotal+=item.total
            })
            state.message = action.payload.message
            toast.success(state.message)
        })
        .addCase(placeOrder.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orders = action.payload
        })
        .addCase(getOrders.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        .addCase(login.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user = action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
            toast.success("Logged in Successfully")
        })
        .addCase(login.rejected,(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.message=action.payload
            toast.error(state.message)
        })
        
    }
})

export const {logOut,addToCompare,removeFromCompare} = authSlice.actions

export {register,login,addToCart,getCart,removeCartItem,updateCartItem,placeOrder,getOrders}

export default authSlice.reducer;