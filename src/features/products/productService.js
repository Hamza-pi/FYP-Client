import axios from "axios";
import {baseUrl} from "../../utils/baseURL"
import { token } from "../../utils/token";
import { toast } from "react-toastify";
const getAllProducts=async(data)=>{

    const response = await axios.get(`${baseUrl}product?${data?.tags?`tags=${data?.tags}&&`:""}${data?.color?`color=${data?.color}&&`:""}${data?.categ?`category=${data?.categ}&&`:""}${data?.inStock?`qty[gt]=${0}&&`:""}${data?.outStock?`qty[lte]=${0}&&`:""}${data?.min?`price[gte]=${data?.min}&&`:""}${data?.max?`price[lte]=${data?.max}&&`:""}`)

    return response.data
}

const addToWishlist= async(id)=>{

   if(!token){
    toast.error("Please Login")
    return {wishlist:[]}
   }else{

    const response = await axios.put(`${baseUrl}product/wishlist`,{id},{headers:{"Authorization":`Bearer ${token}`}})
    
   return response.data
   }
}

const getWishList = async()=>{

    const response = await axios.get(`${baseUrl}user/wishlist`,{headers:{"Authorization":`Bearer ${token}`}})
    
    return response.data
}

const getAProduct = async(id)=>{
    const response = await axios.get(`${baseUrl}product/${id}`,{headers:{"Authorization":`Bearer ${token}`}})
    
    return response.data
}

const addRatings = async(data)=>{

    const response = await axios.put(`${baseUrl}product/ratings`,data,{headers:{"Authorization":`Bearer ${token}`}})

    console.log(response.data)
}

export const productService={
    getAllProducts,
    addToWishlist,
    getWishList,
    getAProduct,
    addRatings
}