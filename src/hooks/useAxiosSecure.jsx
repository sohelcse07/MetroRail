import axios from "axios"

const axiosSecure = axios.create({
    baseURL: 'https://metro-rail-smart-ticket.onrender.com/',
})

function UseAxiosSecure() {
    return (axiosSecure)
}

export default UseAxiosSecure
