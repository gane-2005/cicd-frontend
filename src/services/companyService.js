import axios from 'axios';

const API_URL = 'http://ec2-98-84-125-166.compute-1.amazonaws.com:8081/api/companies';

export const getCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCompany = async (company) => {
  const response = await axios.post(API_URL, company);
  return response.data;
};

export const updateCompany = async (id, company) => {
  const response = await axios.put(`${API_URL}/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
