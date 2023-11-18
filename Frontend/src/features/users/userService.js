import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getUsers = async () => {
  const response = await axios.get(`${base_url}/users`);
  return response.data.data;
  
};

const userService = {
  getUsers,
};

export default userService;
