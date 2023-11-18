import axios from "axios";
import { base_url } from "../../utils/baseUrl";

const getCustomers = async () => {
  const response = await axios.get(`${base_url}/customers`);

  return response.data.data;
};

const customerService = {
  getCustomers,
};

export default customerService;
