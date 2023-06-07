import axios from "axios"
import { baseUrl } from "../../utils/baseURL"

const getAllCateg = async()=>{
    const response = await axios.get(`${baseUrl}category`);
    return response.data
}

export const categoryService={
    getAllCateg
}