import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV == "production" ? 'https://api.bureau-des-legendes.juniorisep.com' : 'http://localhost:8000',
  withCredentials: true
});