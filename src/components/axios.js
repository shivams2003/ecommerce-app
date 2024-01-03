import axios from "axios";
const instance = axios.create({
    baseURL : 'https://us-central1-ecommerce-app-f2f9d.cloudfunctions.net/api'
});

export default instance;