import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-67311.firebaseio.com/",
});

export default instance;
