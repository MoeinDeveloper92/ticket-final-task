import axios from "axios"
const API_URL = "/api/tickets/"

//get notes
const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            "Accept": "application/json",
            "Acess-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`
        },
        baseURL: "/api"
    }
    const response = await axios.get(API_URL + ticketId + "/notes", config)
    return response.data
}


const noteService = {
    getNotes
}

export default noteService