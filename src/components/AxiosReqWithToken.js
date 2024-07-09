import axios from "axios";

function getAxiosReqWithToken(){
    let token = localStorage.getItem("token")
    let apiUrl = "http://localhost:5000"
    let axiosReqWithToken = axios.create({
    baseUrl: apiUrl,
    headers: {
        Authorization: `Bearer ${token}`
    }
})
return axiosReqWithToken
}

export default getAxiosReqWithToken;