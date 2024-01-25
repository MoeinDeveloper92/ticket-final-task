//this file is responsible for sending request to the server
import axios from "axios"

const API_URL = "/api/users"


//register User
const registerUser = async (userData) => {
    const response = await axios.post(API_URL, userData, {
        headers: {
            "Accept": "application/json",
            "Acess-Control-Allow-Origin": "*"
        },
        baseURL: "/api"
    })
    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//Login User
const loginUser = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData, {
        headers: {
            "Accept": "application/json",
            "Acess-Control-Allow-Origin": "*"
        },
        baseURL: "/api"
    })
    if (response.data) {
        window.localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}
//logout user
const logout = () => {
    localStorage.removeItem("user")
}


const authService = {
    registerUser,
    logout,
    loginUser
}


export default authService