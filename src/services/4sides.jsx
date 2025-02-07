import axios from "axios";

const api = "https://www.4sides.com.mx/api/prueba-tecnica/usuarios/index?results=50"

export const GetAllUsers = async ()=>{
    try {
        const users = await axios.get(api)
        
        return users
    } catch (error) {
        console.log(error)
        throw error
    }
}