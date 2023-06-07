import axios from "axios"
import { baseUrl } from "../../utils/baseURL"

const getAllColor = async()=>{
    const response = await axios.get(`${baseUrl}color`);
    return response.data
}

export const colorService={
    getAllColor
}