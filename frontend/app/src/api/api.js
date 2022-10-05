import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json'
})

export default instance;
