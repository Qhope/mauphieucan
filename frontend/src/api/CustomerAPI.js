import axios from "axios";

const BASE_URL = "http://localhost:31658/api";

export const ENDPOINTS = {
  CUSTOMER: "Customers",
  BILLS: "Bills",
};

export const createAPIEndpoint = (endpoint) => {
  let url = BASE_URL + "/" + endpoint;
  return {
    fetchAll: () => axios.get(url),
    create: (payload) => axios.post(url, payload),
    delete: (id) => axios.delete(`${url}/${id}`),
    edit: (id, payload) => axios.put(`${url}/${id}`, payload),
  };
};
