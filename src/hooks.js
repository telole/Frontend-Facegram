import axios from "axios";
import './css/styles.css';



export const api = () => {
    const token = localStorage.getItem("token");
    return axios.create({
      baseURL: "http://localhost:8000/api/v1/",
      headers: { Authorization: "Bearer " + token },
    });
  };