import axios from "axios"
import { baseUrl } from "../../utils/baseURL"
import {token} from "../../utils/token"
import { toast } from "react-toastify"

const registerUser = async(data)=>{
    const response = await axios.post(`${baseUrl}user/register`,data)
    return response.data
}

const loginUser=async(data)=>{

    const response = await axios.post(`${baseUrl}user/login`,data)

    return response.data
}

const addToCart = async(data)=>{

    if(!token){
        toast.error("Please Login");
        return {cart:[]}
    }

    const response = await axios.put(`${baseUrl}user/cart`,data,{headers:{"Authorization":`Bearer ${token}`}})

    return response.data
}

const getCart = async()=>{

    if(!token){
        return []
    }

    const response = await axios.get(`${baseUrl}user/cart`,{headers:{"Authorization":`Bearer ${token}`}})

    return response.data
}

const removeCartItem = async(id)=>{

    const response = await axios.delete(`${baseUrl}user/cart/${id}`,{headers:{"Authorization":`Bearer ${token}`}})

    return response.data

}

const updateCart = async(data)=>{

    const {id,qty} = data

    const response = await axios.put(`${baseUrl}user/cart/update/${id}`,{qty},{headers:{"Authorization":`Bearer ${token}`}})

    return response.data

}


const createOrder = async(data)=>{


    const response = await axios.post(`${baseUrl}user/order/add`,data,{headers:{"Authorization":`Bearer ${token}`}})

    return response.data

}

const getOrders = async()=>{


    const response = await axios.get(`${baseUrl}user/order/get`,{headers:{"Authorization":`Bearer ${token}`}})

    return response.data

}


export const authService={
    registerUser,
    loginUser,
    addToCart,
    getCart,
    removeCartItem,
    updateCart,
    createOrder,
    getOrders
}