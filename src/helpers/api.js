import axios from "axios";

var urlBase = "http://localhost:5000/api";
    const Api = axios.create({
        baseURL: urlBase
    })

export default Api;

