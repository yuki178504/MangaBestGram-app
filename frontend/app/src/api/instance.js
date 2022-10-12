import axios from "axios";
import applyCaseMiddleware from "axios-case-converter";

const options = {
  ignoreHeaders: true
}

const instance = applyCaseMiddleware(axios.create({
    baseURL: process.env.REACT_APP_DEV_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    },
    responseType: 'json'
}), options)

export default instance;
